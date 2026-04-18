import { CommonModule, } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home';
import { MovieCardComponent } from '../components/movie-card/movie-card';

@Component({
  selector: 'app-library',
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './library.html',
  styleUrl: './library.css',
})
export class Library implements OnInit {
  savedMovies: any[] = [];
  loading = true;
  error = '';
  
  private libraryKey = 'libraryMovieIds';

  constructor(private homeService: HomeService) {}

  ngOnInit() {
    this.loadSavedMovies();
  }

  private async loadSavedMovies() {
    this.loading = true;
    this.error = '';
    try {
      // Get saved movie IDs from localStorage
      const raw = localStorage.getItem(this.libraryKey);
      const savedIds: number[] = raw ? JSON.parse(raw) : [];

      if (savedIds.length === 0) {
        this.savedMovies = [];
        return;
      }

      // Fetch full movie details for each saved ID
      const movies = await Promise.all(
        savedIds.map(id => this.homeService.fetchMovieById(id).catch(err => {
          console.error(`Failed to fetch movie ${id}`, err);
          return null;
        }))
      );

      // Filter out any null entries (failed fetches)
      this.savedMovies = movies.filter(m => m !== null);
    } catch (err) {
      console.error('Failed to load library', err);
      this.error = 'Failed to load your library.';
    } finally {
      this.loading = false;
    }
  }

  removeSaved(movie: any) {
    if (!movie || !movie.id) return;
    
    try {
      const raw = localStorage.getItem(this.libraryKey);
      const savedIds: number[] = raw ? JSON.parse(raw) : [];
      const filteredIds = savedIds.filter(id => id !== movie.id);
      localStorage.setItem(this.libraryKey, JSON.stringify(filteredIds));
      
      // Remove from display
      this.savedMovies = this.savedMovies.filter(m => m.id !== movie.id);
    } catch (err) {
      console.error('Failed to remove from library', err);
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
