import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  apiUrl:string="https://ec2-13-201-128-179.projects.wecreateproblems.com/proxy/3000/students"
  constructor(private http:HttpClient) {}

  getStudents():Observable<any>{
    return this.http.get(this.apiUrl);
  }

  addStudent(student:Student):Observable<any>{
    return this.http.post(this.apiUrl,student);
  }
}
