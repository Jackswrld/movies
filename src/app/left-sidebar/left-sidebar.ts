import { Component, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-left-sidebar',
  imports: [RouterModule, NgClass],
  templateUrl: './left-sidebar.html',
  styleUrl: './left-sidebar.css',
})
export class LeftSidebar {
 isLeftSidebarCollapsed = input.required<boolean>()
 changeIsLeftSidebarCollapsed = output<boolean>()
  items = [
  {
    RouterLink: 'home',
    icon: 'fa-solid fa-house',
    label: 'Home',
  },
  {
    RouterLink: 'categories',
    icon: 'fa-solid fa-box-open',
    label: ' Categories ',
  },
  {
    RouterLink: 'library',
    icon: 'fa-solid fa-file',
    label: 'Library',
  },
  {
    RouterLink: 'settings',
    icon: 'fa-solid fa-gear',
    label: 'Settings',
  }
];

   toggleCollapse(): void {
  this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed())
   }

   closeSidenav(): void {
    this.changeIsLeftSidebarCollapsed.emit(true)
   }
}
