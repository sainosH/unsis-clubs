import { Injectable } from '@angular/core';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root',
})
export class StudentEditService {
  private student: Student | null = null;

  set(student: Student) {
    this.student = student;
  }

  get(): Student | null {
    return this.student;
  }

  clear() {
    this.student = null;
  }
}
