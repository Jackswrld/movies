import { Component } from '@angular/core';

@Component({
  selector: 'app-categories',
  imports: [],
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

}
