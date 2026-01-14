import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HomeService } from '../services/home';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  movies: any[] = [];
  loading = true;
  error = '';

  // Library persistence key (localStorage)
  private libraryKey = 'libraryMovieIds';
  private savedIds = new Set<number>();

  constructor(private homeService: HomeService) {
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
}
