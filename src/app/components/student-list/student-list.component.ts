import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Student } from '../../models/student';
import { StudentService } from '../../services/student.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
})
export class StudentListComponent implements OnInit {
  @Input() clubs: string[] = ['Futbol', 'Volibol', 'Gymnacion'];
  @Output() editStudent = new EventEmitter<Student>();

  selectedClub: string = this.clubs[0];
  students: Student[] = [];

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadStudents(); // Carga inicial al crear el componente
  }

  onClubChange(): void {
    this.loadStudents(); // Se ejecuta cuando cambia el club
  }

  loadStudents(): void {
    console.log('Cargando estudiantes para:', this.selectedClub); // Debug

    if (this.selectedClub) {
      this.studentService.getStudents(this.selectedClub).subscribe({
        next: (students) => {
          console.log('Estudiantes recibidos:', students); // Debug
          this.students = students;
        },
        error: (err) => {
          console.error('Error al cargar estudiantes:', err);
        },
      });
    }
  }

  onDelete(student: Student): void {
    if (confirm('¿Eliminar este estudiante?')) {
      this.studentService.deleteStudent(student.club, student.id!).then(() => {
        this.loadStudents(); // Recarga después de eliminar
      });
    }
  }
}
