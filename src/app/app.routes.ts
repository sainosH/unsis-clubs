import { Routes } from '@angular/router';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { StudentListComponent } from './components/student-list/student-list.component';

export const routes: Routes = [
  { path: 'registro', component: StudentFormComponent },
  { path: 'lista', component: StudentListComponent },
  { path: '', redirectTo: '/registro', pathMatch: 'full' }, // Redirige a '/registro' por defecto
];
