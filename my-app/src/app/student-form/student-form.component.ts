import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent {
  studentForm!:FormGroup;
  successMessage!:string;
  successFlag!:boolean;
  errorFlag!:boolean;
  errorMessage!:string;

  constructor(private fb:FormBuilder,private studentService:StudentService){
    this.studentForm=this.fb.group({
      name:["",[Validators.required]],
      department:["",[Validators.required]],
      course:["",[Validators.required]],
      email:["",[Validators.required,Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-z0-9]+\.[a-zA-Z]{2,}$')]],
      phone:["",[Validators.required,Validators.pattern('^(\\+?\\d{1,3})?[-\s]?\\d{10}$')]],
      location:["",[Validators.required]]
    })
  }

  onSubmit():void{
    if(this.studentForm.valid){
      this.studentService.addStudent(this.studentForm.value).subscribe({
        next:() =>{
          this.successFlag=true;
          this.errorFlag=false;
          this.successMessage="Student saved successfully!";
          this.errorMessage="";
          this.studentForm.reset();

          setTimeout(()=>{
            this.successMessage='';
          },3000);
        },  
          error:(err)=>{
            this.successFlag=false;
            this.errorFlag=true;
            this.errorMessage='Error adding student';
            console.log(err)
            this.successMessage='';
          }
        
      }
        
      )
    }
  }
}
