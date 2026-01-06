import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

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

  constructor() {
    // Load saved library state and start fetching movies
    this.loadLibrary();
    this.fetchMovies();
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

  async fetchMovies() {
    // Replace 'YOUR_TMDB_API_KEY' with a valid TMDB API key (https://www.themoviedb.org)
    const API_KEY = 'a8d66966b5aecf286bd240acbe78a1e6';
    const TMDB_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

    try {
      const res = await fetch(TMDB_URL);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      this.movies = (json.results || []).map((m: any) => ({
        id: m.id,
        title: m.title,
        overview: m.overview,
        poster_path: m.poster_path,
        vote_average: m.vote_average,
        release_date: m.release_date,
      }));
    } catch (err) {
      console.error(err);
      this.error = 'Failed to load movies. Check your API key or network and try again.';
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
