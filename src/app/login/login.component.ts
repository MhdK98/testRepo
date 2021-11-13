import { HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject();

  signBtn: boolean = false;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthServiceService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  checkAuthentication() {
    this.signBtn = true;
    if (this.loginForm.valid) {
      this.authService.Login(this.loginForm.value).subscribe((data: HttpResponse<any>) => {
        console.log({ data });
        if (data.ok) {
          localStorage.setItem("token", data.body.token);
          console.log("token", localStorage.getItem("token"));
          this.router.navigate(['homePage']);
        } else {
          alert("wrong credintials");
          this.signBtn = false;
        }
      },
      (err) =>{
        this.signBtn = false;
      });
    }else{
      this.signBtn = false;
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
