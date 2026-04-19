import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../services/home';
import { MovieCardComponent } from '../components/movie-card/movie-card';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, MovieCardComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  movies: any[] = [];
  loading = true;
  error = '';
  searchQuery = '';
  isSearching = false;
  searchPerformed = false;

  // Library persistence key (localStorage)
  private libraryKey = 'libraryMovieIds';
  private savedIds = new Set<number>();
  private searchTimeout: any;

  constructor(private homeService: HomeService, private router: Router) {
    // Load saved library state and start fetching movies
    this.loadLibrary();
    this.loadMovies();
  }

  private loadLibrary() {
    try {
      const raw = localStorage.getItem(this.libraryKey);
      const arr = raw ? JSON.parse(raw) : [];
      if (Array.isArray(arr)) arr.forEach((id: number) => this.savedIds.add(id));
    } catch (e) {
      console.warn('Failed to load library from localStorage', e);
    }
  }

  private saveLibrary() {
    try {
      localStorage.setItem(this.libraryKey, JSON.stringify(Array.from(this.savedIds)));
    } catch (e) {
      console.warn('Failed to save library to localStorage', e);
    }
  }

  isSaved(movie: any) {
    return movie && this.savedIds.has(movie.id);
  }

  toggleSave(movie: any) {
    if (!movie || !movie.id) return;
    if (this.savedIds.has(movie.id)) {
      this.savedIds.delete(movie.id);
    } else {
      this.savedIds.add(movie.id);
    }
    this.saveLibrary();
  }

  async loadMovies() {
    this.loading = true;
    this.error = '';
    try {
      this.movies = await this.homeService.fetchMovies();
    } catch (err) {
      console.error(err);
      this.error = 'Failed to load movies. Check your API key or network and try again.';
      this.movies = [];
    } finally {
      this.loading = false;
    }
  }

  posterUrl(path: string) {
    return path ? `https://image.tmdb.org/t/p/w500${path}` : 'assets/no-poster.svg';
  }

  truncated(text: string | undefined, len = 120) {
    if (!text) return '';
    return text.length > len ? text.slice(0, len).trim() + '…' : text;
  }

  trackByMovie(_: number, movie: any) {
    return movie && movie.id;
  }

  navigateToAuth() {
    this.router.navigate(['/auth']);
  }

  onSearch(query: string) {
    this.searchQuery = query;
    
    // Clear existing timeout
    if (this.searchTimeout) clearTimeout(this.searchTimeout);
    
    // If query is empty, reset to popular movies
    if (!query.trim()) {
      this.searchPerformed = false;
      this.loadMovies();
      return;
    }
    
    // Debounce search with 500ms delay
    this.searchTimeout = setTimeout(() => {
      this.performSearch(query);
    }, 500);
  }

  private async performSearch(query: string) {
    this.isSearching = true;
    this.error = '';
    try {
      this.movies = await this.homeService.searchMovies(query);
      this.searchPerformed = true;
      if (this.movies.length === 0) {
        this.error = `No movies found for "${query}". Try a different search term.`;
      }
    } catch (err) {
      console.error(err);
      this.error = 'Search failed. Check your network and try again.';
      this.movies = [];
    } finally {
      this.isSearching = false;
    }
  }

  clearSearch() {
    this.searchQuery = '';
    this.searchPerformed = false;
    this.error = '';
    this.loadMovies();
  }
}
