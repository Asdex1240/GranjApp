import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model'; 
import { ModalController } from '@ionic/angular';
import {FormGroup, FormBuilder, Validators, FormControl, AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.page.html',
  styleUrls: ['./entrar.page.scss'],
})
export class EntrarPage implements OnInit {


  user: User = new User;
  ionicForm: FormGroup;
  
  constructor(private router: Router, private authSvc: AuthService,
    private modalCtrl: ModalController,private formBuilder: FormBuilder) { }

  ngOnInit() {  this.buildForm();
  }
  buildForm(){
    this.ionicForm = this.formBuilder.group({
      email: new FormControl('',{validators: [Validators.email,Validators.required]}),
      password: new FormControl('', {validators: [Validators.required, Validators.minLength(6)]})
    });
  }

  async onLogin(){
    const user = await this.authSvc.onLogin(this.user);
    if(user){
      console.log("Sesion iniciada");
      this.router.navigateByUrl('/tabs/tab3');
    }
  }
  
  hasError: any = (controlName: string, errorName: string) => {
		return !this.ionicForm.controls[controlName].valid &&
			this.ionicForm.controls[controlName].hasError(errorName) &&
			this.ionicForm.controls[controlName].touched;
	}
  notZero(control: AbstractControl) {
		if (control.value && control.value.monto <= 0) {
			return { 'notZero': true };
		}
		return null;
	} 
  submitForm(){
    if(this.ionicForm.valid){
      this.user.email = this.ionicForm.get('email').value;
      this.user.password = this.ionicForm.get('password').value;
      this.onLogin();
    }
  }


}
