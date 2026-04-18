import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Categories as CategoriesService } from '../services/categories';
import { MovieCardComponent } from '../components/movie-card/movie-card';

@Component({
  selector: 'app-categories',
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories {
  categories = [
    {
      name: 'Actions',
      id: 1,
      description: 'Fast-paced films featuring stunts, chases, and high-energy thrills.',
      fontAwesomeIcon: 'fas fa-fire',
      color: '#e63946'
    },
    {
      name: 'Horror',
      id: 2,
      description: 'Chilling and suspenseful films that explore fear, the supernatural, and psychological tension.',
      fontAwesomeIcon: 'fas fa-ghost',
    },
    {
      name: 'Comedy',
      id: 3,
      description: 'Light-hearted and witty films designed to entertain and make you laugh.',
      fontAwesomeIcon: 'fas fa-face-grin-squint',
      color: '#ffaa00bc'
    },
    {
      name: 'Sci-Fi',
      id: 4,
      description: 'Speculative stories about technology, space, and imaginative futures.',
      fontAwesomeIcon: 'fas fa-rocket',
      color: '#0a9396'
    },
    {
      name: 'K-drama',
      id: 5,
      description: 'Korean dramas known for emotional storytelling, romance, and memorable characters.',
      fontAwesomeIcon: 'fas fa-moon',
      color: '#9d4edd'
    },

    {
      name: 'Animations',
      id: 6,
      description: 'Animated films for all ages featuring imaginative visuals and heartfelt stories.',
      fontAwesomeIcon: 'fas fa-palette',
      color: '#7a5614ff'
    },

    {
      name: 'Adventure',
      id: 7,
      description: 'Exciting journeys and epic quests filled with action and discovery.',
      fontAwesomeIcon: 'fas fa-compass',
      color: '#f3722cff'
    },
  ];

  // UI state
  selectedCategory: any = null;
  movies: any[] = [];
  loading = false;
  error: string | null = null;

  private libraryKey = 'libraryMovieIds';
  private savedIds = new Set<number>();

  constructor(private categoriesService: CategoriesService) {
    this.loadLibrary();
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

  async onCategoryClick(category: any) {
    this.selectedCategory = category;
    this.movies = [];
    this.error = null;
    this.loading = true;
    try {
      this.movies = await this.categoriesService.fetchMoviesByGenre(category.id);
    } catch (err: any) {
      console.error(err);
      this.error = err?.message || 'Failed to fetch movies.';
    } finally {
      this.loading = false;
    }
  }
}
