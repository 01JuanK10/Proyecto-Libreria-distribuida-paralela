import { Routes } from '@angular/router';
import { Book } from './components/book/book';
import { Client } from './components/client/client';
import { Report } from './components/report/report';

export const routes: Routes = [
    {path: '', redirectTo: '/book', pathMatch: 'full'},
    {path: 'book', component: Book},
    {path: 'client', component: Client},
    {path: 'report', component: Report}
];
