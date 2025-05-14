import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { Student } from './models/student';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    StudentFormComponent,
    StudentListComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'unsis-clubs';
  studentToEdit: Student | null = null;

  handleEdit(student: Student) {
    this.studentToEdit = student;
  }

  clearEdit() {
    this.studentToEdit = null;
  }
}
