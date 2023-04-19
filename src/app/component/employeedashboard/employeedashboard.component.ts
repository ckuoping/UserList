import { Component, OnInit ,ViewChild, ElementRef} from '@angular/core';
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
  employeeArr : Employee[] = [];

  @ViewChild('cancel', { static: true }) cancel_btn!: ElementRef;

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

    this.getEmployeeDetails()

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

      this.cancel_btn.nativeElement.click();

      this.formValue.reset();
    },err =>{
      alert("fail to add a employee")
    }
    )
  }

  getEmployeeDetails(){
    this.api.getEmployee().subscribe(
      res =>{
        this.employeeArr = res;
      },
      err=>{
        console.log(err+'fail to get all details')
      }
    )
  }

}
