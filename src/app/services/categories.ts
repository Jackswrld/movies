import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Categories {
  // Replace this API key with your TMDB key if needed
  private API_KEY = 'a8d66966b5aecf286bd240acbe78a1e6';

  // Map local category IDs (1..n) to TMDB genre IDs — adjust as needed
  private genreMap: Record<number, number> = {
    1: 28,  // Actions -> TMDB 28
    2: 27,  // Horror  -> TMDB 27
    3: 35,  // Comedy  -> TMDB 35
    4: 878, // Sci-Fi  -> TMDB 878
    5: 18,  // K-drama (mapped to Drama) -> TMDB 18 (adjust if you prefer)
    6: 16,  // Animations -> TMDB 16
    7: 12   // Adventure -> TMDB 12
  };

  getTmdbGenreId(localId: number): number | null {
    return this.genreMap[localId] ?? null;
  }

  async fetchMoviesByGenre(localCategoryId: number): Promise<any[]> {
    const tmdbGenreId = this.getTmdbGenreId(localCategoryId);
    if (!tmdbGenreId) return [];

    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${this.API_KEY}&with_genres=${tmdbGenreId}&language=en-US&page=1`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const json = await res.json();
    return (json.results || []).map((m: any) => ({
      id: m.id,
      title: m.title || m.name,
      overview: m.overview,
      poster_path: m.poster_path,
      vote_average: m.vote_average,
      release_date: m.release_date,
      genre_ids: m.genre_ids
    }));
  }
}
