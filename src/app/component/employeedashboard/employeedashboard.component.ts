import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Employee } from 'src/app/class/employee';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-employeedashboard',
  templateUrl: './employeedashboard.component.html',
  styleUrls: ['./employeedashboard.component.scss']
})
export class EmployeedashboardComponent implements OnInit {

  formValue !: FormGroup;
  employeeObj : Employee = new Employee();

  constructor(private formbuilder : FormBuilder, private api : ApiService) { }

  ngOnInit(): void {

    this.formValue = this.formbuilder.group(
      {
        firstName : [''],
        lastName : [''],
        email : [''],
        mobile : [''],
        salary : ['']
      }

    )

  }

  postEmployeeDetails(){
    this.employeeObj.firstName = this.formValue.value.firstName;
    this.employeeObj.lastName = this.formValue.value.lastName;
    this.employeeObj.email = this.formValue.value.email;
    this.employeeObj.mobile = this.formValue.value.mobile;
    this.employeeObj.salary = this.formValue.value.salary;
    this.api.addEmployee(this.employeeObj).subscribe(
      res =>{
      console.log('res',res)
      alert("successfully add a employee");
      this.formValue.reset();
    },err =>{
      alert("fail to add a employee")
    }
    )
  }

}
