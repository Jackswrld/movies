import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  // Replace 'YOUR_TMDB_API_KEY' with a valid TMDB API key (https://www.themoviedb.org)
  private API_KEY = 'a8d66966b5aecf286bd240acbe78a1e6';
  private TMDB_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${this.API_KEY}&language=en-US&page=1`;

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
    }));
  }
}
