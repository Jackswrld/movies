import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  // Replace 'YOUR_TMDB_API_KEY' with a valid TMDB API key (https://www.themoviedb.org)
  private API_KEY = 'a8d66966b5aecf286bd240acbe78a1e6';
  private TMDB_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${this.API_KEY}&language=en-US&page=1`;
  private GENRE_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.API_KEY}&language=en-US`;

  private genreMap: Map<number, string> = new Map();

  constructor() {
    this.loadGenres();
  }

  private async loadGenres() {
    try {
      const res = await fetch(this.GENRE_URL);
      if (res.ok) {
        const json = await res.json();
        (json.genres || []).forEach((g: any) => this.genreMap.set(g.id, g.name));
      }
    } catch (e) {
      console.error('Failed to load genres', e);
    }
  }

  async fetchMovies(): Promise<any[]> {
    const res = await fetch(this.TMDB_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return (json.results || []).map((m: any) => ({
      id: m.id,
      title: m.title,
      overview: m.overview,
      poster_path: m.poster_path,
      vote_average: m.vote_average,
      release_date: m.release_date,
      genre_ids: m.genre_ids || [],
      genres: (m.genre_ids || []).map((id: number) => this.genreMap.get(id)).filter((g: any) => g),
    }));
  }

  async fetchMovieById(id: number): Promise<any> {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${this.API_KEY}&language=en-US`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const m = await res.json();
    return {
      id: m.id,
      title: m.title,
      overview: m.overview,
      poster_path: m.poster_path,
      vote_average: m.vote_average,
      release_date: m.release_date,
    };
  }
}
