import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm !: FormGroup;
  constructor(private formbuilder : FormBuilder,private http : HttpClient, private router : Router) { }

  ngOnInit(): void {

    this.signupForm = this.formbuilder.group(
      {
        fullname : [''],
        email : [''],
        password : [''],
        mobile : ['']
      }

    )
  }

  signUp(){
    this.http.post<any>("http://localhost:3000/signupUsers",this.signupForm.value)
    .subscribe(res=>{
      alert('Sign Up Successfully!');

      this.signupForm.reset();
      
      this.router.navigate(['login']);
    },err=>{
      alert('Sign Up Fail!');
    })
  }

}
