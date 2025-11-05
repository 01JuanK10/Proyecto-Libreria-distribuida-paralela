import { Routes } from '@angular/router';
import { Book } from './components/book/book';

export const routes: Routes = [
    {path: '', redirectTo: '/book', pathMatch: 'full'},
    {path: 'book', component: Book}
];
