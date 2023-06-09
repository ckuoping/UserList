import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm !: FormGroup;
  constructor(private formbuilder : FormBuilder,private http : HttpClient, private router : Router) { }

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group(
      {    
        email : [''],
        password : ['']
      }

    )
  }
  logIn(){
    this.http.get<any>("http://localhost:3000/signupUsers")
    .subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
      });

      if(user){
        alert('login successfully');
        this.loginForm.reset();
        this.router.navigate(['dashboard']);
      }
      else{
        alert('user not found');
      }
    },err=>{
      alert('something went wrong');
    })
  }
}
