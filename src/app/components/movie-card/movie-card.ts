import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.css',
})
export class MovieCardComponent {
  @Input() movie: any;
  @Input() isSaved: boolean = false;
  @Output() toggleSave = new EventEmitter<any>();

  onToggleSave(event: Event) {
    event.stopPropagation();
    this.toggleSave.emit(this.movie);
  }

  posterUrl(path: string) {
    return path ? `https://image.tmdb.org/t/p/w500${path}` : 'assets/no-poster.svg';
  }

  truncated(text: string | undefined, len = 120) {
    if (!text) return '';
    return text.length > len ? text.slice(0, len).trim() + '…' : text;
  }
}
