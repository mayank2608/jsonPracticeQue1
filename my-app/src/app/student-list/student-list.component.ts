import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { Student } from '../models/student';
import { map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit{
  students!:Student[];
  searchTerm!:string;
  data$:Observable<Student[]>=of([]);
  finalData$:Observable<Student[]>=of([]);

  constructor(private studentService:StudentService){}

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(){
    this.data$=this.studentService.getStudents();
    this.finalData$=this.data$.pipe(
      map((d)=>
        d.sort((a:Student,b:Student)=>a.name.localeCompare(b.name))
      )
    );

  }

  searchValue(e:any){
   const valueGiven=e.target.value;
   if(!valueGiven){
    this.finalData$=this.data$;
    return;
   }
   else{
    this.finalData$=this.data$.pipe(
      map((students)=>{
        return students.filter((student)=>
          student.id.toString().includes(valueGiven) ||
          student.name.toString().includes(valueGiven)
        )
      })
    );
   }
  }

}
