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
  isEdit : boolean = false;

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

  onAdd(){
    this.formValue.reset();
  }

  postEmployeeDetails()
  {
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

      this.ngOnInit();
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

  deleteEmployee(employee:Employee){
    this.api.deleteEmployee(employee.id).subscribe(
      res=>{
        alert("successfully delete a employee");
        this.ngOnInit();
      },
      err=>{
        alert("fail to delete a employee");
      }
    )

  }

  onEdit(employee:Employee){
    this.employeeObj  = new Employee();
    this.employeeObj.id = employee.id;
    this.formValue.controls['firstName'].setValue(employee.firstName);
    this.formValue.controls['lastName'].setValue(employee.lastName);
    this.formValue.controls['email'].setValue(employee.email);
    this.formValue.controls['mobile'].setValue(employee.mobile);
    this.formValue.controls['salary'].setValue(employee.salary);
  }

  updateEmplyee(){
    this.employeeObj.firstName = this.formValue.value.firstName;
    this.employeeObj.lastName = this.formValue.value.lastName;
    this.employeeObj.email = this.formValue.value.email;
    this.employeeObj.mobile = this.formValue.value.mobile;
    this.employeeObj.salary = this.formValue.value.salary;

    this.api.updateEmployee(this.employeeObj,this.employeeObj.id).subscribe(
      res =>{
        alert("update successfully");
        this.cancel_btn.nativeElement.click();

        this.formValue.reset();
  
        this.ngOnInit();
      },
      err=>{
        alert("fail to update a employee")
      }
    )
  }

}
