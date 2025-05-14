import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Student } from '../../models/student';
import { StudentService } from '../../services/student.service';


@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'],
})
export class StudentFormComponent {
  @Input() clubs: string[] = ['Futbol', 'Volibol', 'Gymnacion'];
  @Input() studentToEdit: Student | null = null;
  @Output() studentSaved = new EventEmitter<void>();

  student: Student = {
    studentId: '',
    fullName: '',
    email: '',
    club: this.clubs[0],
  };

  constructor(private studentService: StudentService) {}

  ngOnChanges() {
    if (this.studentToEdit) {
      this.student = { ...this.studentToEdit };
    }
  }

  saveStudent() {
    const operation = this.studentToEdit
      ? this.studentService.updateStudent(
          this.student.club,
          this.student.id!,
          this.student
        )
      : this.studentService.addStudent(this.student);

    operation.then(() => {
      this.student = {
        studentId: '',
        fullName: '',
        email: '',
        club: this.clubs[0],
      };
      this.studentSaved.emit();
    });
  }
}
