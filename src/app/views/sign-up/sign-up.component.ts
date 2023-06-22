import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { User } from 'src/app/users/model/user';
import { UserserviceService } from 'src/app/users/services/userservice.service';
import {Router} from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxValidFormComponent } from '../dialog-box-valid-form/dialog-box-valid-form.component';
import { DialogBoxInvalidFormComponent } from '../dialog-box-invalid-form/dialog-box-invalid-form.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {

  registered: boolean = false;
  tempUser: User;

  hidePassword = true;
  hideConfirmPassword = true;
  passwordMatchMessage = '';
  registerForm!: FormGroup;

  constructor(private userService: UserserviceService, public dialog: MatDialog, private formBuilder: FormBuilder, private router: Router) {
    this.tempUser = {} as User;
    this.registerForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastname: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3)],
        updateOn: 'change',
      }),
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        updateOn: 'change',
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(7)],
        updateOn: 'change',
      }),
      confirmPassword: new FormControl('', {
        validators: [Validators.required, Validators.minLength(7)],
        updateOn: 'change',
      }),
      phone: new FormControl('', {
        validators: [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('^[0-9]*$')],
        updateOn: 'change',
      }),
    });

  }

  getMinLengthErrorMessage(element: string, numOfCharacters: number) {
    if (this.registerForm.get(element)?.hasError('required')) {
      return 'You must enter a value';
    }
    return this.registerForm.get(element)?.hasError('minlength')
      ? `Must have a minimun of ${numOfCharacters} characters`
      : '';
  }

  getEmailErrorMessage() {
    if (this.registerForm.get('email')?.hasError('required')) {
      return 'You must enter a value';
    }
    return this.registerForm.get('email')?.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  getPasswordErrorMessage() {
    if (this.registerForm.get('password')?.hasError('required')) {
      return 'You must enter a value';
    }
    return this.registerForm.get('password')?.hasError('minlength')
      ? 'Must have a minimun of 7 characters'
      : '';
  }

  getConfirmPasswordErrorMessage() {
    if (this.registerForm.get('confirmPassword')?.hasError('required')) {
      return 'You must enter a value';
    }
    return this.registerForm.get('confirmPassword')?.hasError('minlength')
      ? 'Must have a minimun of 7 characters'
      : '';
  }

  getPhoneErrorMessage() {
    if (this.registerForm.get('phone')?.hasError('required')) {
      return 'You must enter a value';
    }
    //Deber ser solo numeros
    if(this.registerForm.get('phone')?.hasError('pattern')) {
      return 'Must be only numbers';
    }

    return this.registerForm.get('phone')?.hasError('minlength')
      ? 'Must have a minimun of 9 numbers'
      : this.registerForm.get('phone')?.hasError('maxlength')
      ? 'Must have a maximun of 9 numbers'
      : '';
  }

  passwordMatchErrorMessage() {
    this.passwordMatchMessage =
      this.registerForm.get('password')?.value ===
      this.registerForm.get('confirmPassword')?.value
        ? ''
        : 'Passwords must match to create an account';
    console.log(this.passwordMatchMessage);
  }


  createUser() {
    console.log('User created');
    this.tempUser.email = this.registerForm.get('email')?.value;
    this.tempUser.firstName = this.registerForm.get('name')?.value;
    this.tempUser.lastName = this.registerForm.get('lastname')?.value;
    this.tempUser.password = this.registerForm.get('password')?.value;
    this.tempUser.phone = this.registerForm.get('phone')?.value;

    this.userService.postUser(this.tempUser).subscribe((data) => {
      console.log(data);
      this.dialog.open(DialogBoxValidFormComponent, {
        data: { message: 'Usuario creado exitosamente. Inicie sesión' },
      });
      this.dialog.afterAllClosed.subscribe(result => {
        // Código a ejecutar después de cerrar el diálogo
        this.router.navigate(['/login']);
      });
    }
    );
  }

  verifyUserRegistered() {
    console.log('Email checked');
    this.registered = false;
    var req = new XMLHttpRequest();
    req.open('GET', `https://finanzasapi.azurewebsites.net/api/v1/users/searchByEmail/${this.registerForm.get('email')?.value}`, false);
    req.send(null);
    if(req.status == 200){
      var user = JSON.parse(req.responseText);
      console.log(user);
      if (user.email == this.registerForm.get('email')?.value) {
        this.registered = true;
        console.log('User already registered');
        this.dialog.open(DialogBoxInvalidFormComponent,{
          data: {message: 'Este correo ya se encuentra registrado'}
        });
      }
    }
  }

  openDialog() {
    console.log('Dialog opened');
    this.verifyUserRegistered();
    if (!this.registered) {
      this.createUser();
    }
  }


  ngOnInit(): void {

  }
}
