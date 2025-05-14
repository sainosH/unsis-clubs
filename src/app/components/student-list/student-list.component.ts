import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

import { Student } from '../../models/student';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
})
export class StudentListComponent implements OnInit {
  @Output() editStudent = new EventEmitter<Student>();

  clubs = [
    { value: 'Futbol', label: 'Futbol' },
    { value: 'Volibol', label: 'Volibol' },
    { value: 'Gimnasio', label: 'Gimnasio' },
  ];
  selectedClub = this.clubs[0].value;
  students: Student[] = [];

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  /** Filtrar por un solo club */
  loadStudents(): void {
    console.log('Cargando club:', this.selectedClub);
    this.studentService.getStudentsByClub(this.selectedClub).subscribe({
      next: (students: Student[]) => (this.students = students),
      error: (err: any) => {
        console.error('Error cargando club:', err);
        this.students = [];
      },
    });
  }

  /** Mostrar todos los estudiantes de todos los clubs */
  loadAllStudents(): void {
    this.studentService
      .getAllStudents()
      .pipe(map((list) => list.sort((a, b) => a.club.localeCompare(b.club))))
      .subscribe({
        next: (all: Student[]) => {
          this.students = all;
          this.selectedClub = ''; // opcional: limpiar filtro
        },
        error: (err: any) => {
          console.error('Error cargando todos:', err);
          this.students = [];
        },
      });
  }

  /** Borrar estudiante */
  onDelete(student: Student): void {
    if (!confirm('¿Eliminar este estudiante?')) return;
    this.studentService
      .deleteStudent(student.club, student.id!)
      .then(() => this.loadStudents())
      .catch((err) => console.error('Error eliminando:', err));
  }
}
