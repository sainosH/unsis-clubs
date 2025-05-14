import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Student } from '../../models/student';
import { StudentService } from '../../services/student.service';
import { FormsModule } from '@angular/forms'; // Añadir esta importación


@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
})
export class StudentListComponent {
  @Input() clubs: string[] = ['Futbol', 'Volibol', 'Gymnacion'];
  @Output() editStudent = new EventEmitter<Student>();

  selectedClub: string = this.clubs[0];
  students: Student[] = [];

  constructor(private studentService: StudentService) {}

  loadStudents() {
    this.studentService.getStudents(this.selectedClub).subscribe((students) => {
      this.students = students;
    });
  }

  onDelete(student: Student) {
    if (confirm('¿Eliminar este estudiante?')) {
      this.studentService.deleteStudent(student.club, student.id!).then(() => {
        this.loadStudents();
      });
    }
  }
}
