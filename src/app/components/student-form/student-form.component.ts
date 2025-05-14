import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Student } from '../../models/student';
import { StudentService } from '../../services/student.service';
import { StudentEditService } from '../../services/student-edit.service';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'],
})
export class StudentFormComponent {
  @Input() clubs: string[] = ['Futbol', 'Volibol', 'Gimnasio'];
  showSuccessMessage = false;
  @Input() studentToEdit: Student | null = null;
  @Output() studentSaved = new EventEmitter<void>();

  // Objeto estudiante con todos los campos inicializados
  student: Student = {
    studentId: '',
    fullName: '',
    email: '',
    club: this.clubs[0], // Valor por defecto
    registrationDate: new Date().toISOString(),
  };

  constructor(
    private studentService: StudentService,
    private editService: StudentEditService
  ) {}

  ngOnInit(): void {
    this.studentToEdit = this.editService.get();
    if (this.studentToEdit) {
      this.student = { ...this.studentToEdit };
      this.editService.clear();
    }
  }

  onSubmit(): void {
    if (this.isFormValid()) {
      const operation = this.studentToEdit
        ? this.studentService.updateStudent(
            this.student.club,
            this.student.id!,
            this.student
          )
        : this.studentService.registerStudent(this.student.club, this.student);

      operation
        .then(() => {
          this.showSuccessMessage = true;
          this.resetForm();
          this.studentSaved.emit();
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }

  private isFormValid(): boolean {
    return (
      !!this.student.studentId &&
      !!this.student.fullName &&
      !!this.student.email &&
      !!this.student.club
    );
  }

  private resetForm(): void {
    this.student = {
      studentId: '',
      fullName: '',
      email: '',
      club: this.clubs[0],
      registrationDate: new Date().toISOString(),
    };
    this.studentToEdit = null;
  }
}
