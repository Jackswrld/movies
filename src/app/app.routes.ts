import { Routes } from '@angular/router';
import { Settings } from './settings/settings';
import { Home } from './home/home';
import { Categories } from './categories/categories';
import { Library } from './library/library';
import { Redirect } from './redirect/redirect';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: Home},
    {path: 'categories', component: Categories},
    {path: 'settings', component: Settings},
    {path: 'library', component: Library},


    {path: '**', component: Redirect}
];
