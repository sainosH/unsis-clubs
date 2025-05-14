import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  deleteDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { Student } from '../models/student';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private firestore: Firestore) {}

  addStudent(student: Student) {
    const clubRef = collection(this.firestore, student.club);
    return addDoc(clubRef, {
      ...student,
      registrationDate: new Date().toISOString(),
    });
  }

  getStudents(club: string): Observable<Student[]> {
    const clubRef = collection(this.firestore, club);
    return collectionData(clubRef, { idField: 'id' }) as Observable<Student[]>;
  }

  deleteStudent(club: string, id: string) {
    const studentDoc = doc(this.firestore, `${club}/${id}`);
    return deleteDoc(studentDoc);
  }

  updateStudent(club: string, id: string, student: Student) {
    const studentDoc = doc(this.firestore, `${club}/${id}`);
    return updateDoc(studentDoc, { ...student });
  }

  registerStudent(clubName: string, student: Student): Promise<void> {
    const clubRef = collection(this.firestore, clubName);
    return addDoc(clubRef, {
      studentId: student.studentId,
      fullName: student.fullName,
      email: student.email,
      club: clubName,
      registrationDate: new Date().toISOString(),
    }).then((docRef) => {
      console.log('Registrado con ID:', docRef.id);
    });
  }
}
