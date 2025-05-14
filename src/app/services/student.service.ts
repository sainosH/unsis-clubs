import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  query,
} from '@angular/fire/firestore';
import { Student } from '../models/student';
import { Observable, combineLatest, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private firestore: Firestore) {}

  /** 1) Obtener todos los estudiantes de todos los clubs */
  getAllStudents(): Observable<Student[]> {
    const clubs = ['Futbol', 'Volibol', 'Gimnasio'];
    const queries = clubs.map((club) =>
      collectionData(
        query(collection(this.firestore, club)),
        { idField: 'id' }
      ) as Observable<Partial<Student>[]>
    );

    return combineLatest(queries).pipe(
      map((results) => {
        // results es Student[][], un array por cada club
        return results.flatMap((studentsArray, idx) =>
          studentsArray.map(d => ({
            id: d.id!,
            studentId: d.studentId!,
            fullName: d.fullName!,
            email: d.email!,
            club: clubs[idx],
            registrationDate: d.registrationDate!
          } as Student))
        );
      }),
      catchError((err) => {
        console.error('Error al obtener todos los estudiantes:', err);
        return of([]);
      })
    );
  }

  /** 2) Obtener estudiantes de un solo club */
  getStudentsByClub(club: string): Observable<Student[]> {
    const clubRef = collection(this.firestore, club);
    return collectionData(clubRef, { idField: 'id' }).pipe(
      map(data =>
        (data as Partial<Student>[]).map(d => ({
          id: d.id!,
          studentId: d.studentId!,
          fullName: d.fullName!,
          email: d.email!,
          club: club,
          registrationDate: d.registrationDate!
        } as Student))
      ),
      catchError(err => {
        console.error(`Error al obtener estudiantes de ${club}:`, err);
        return of([]);
      })
    );
  }

  /** 3) Borrar estudiante */
  deleteStudent(club: string, id: string): Promise<void> {
    const studentDoc = doc(this.firestore, `${club}/${id}`);
    return deleteDoc(studentDoc);
  }

  /** 4) Editar estudiante */
  updateStudent(
    club: string,
    id: string,
    student: Partial<Student>
  ): Promise<void> {
    const studentDoc = doc(this.firestore, `${club}/${id}`);
    return updateDoc(studentDoc, student);
  }

  /** 5) Registrar estudiante */
  registerStudent(
    clubName: string,
    student: Omit<Student, 'id'>
  ): Promise<void> {
    const clubRef = collection(this.firestore, clubName);
    return addDoc(clubRef, {
      ...student,
      registrationDate: new Date().toISOString(),
    }).then(docRef => {
    });
  }
}
