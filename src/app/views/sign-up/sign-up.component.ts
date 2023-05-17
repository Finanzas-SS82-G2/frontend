import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  hidePassword = true;
  hideConfirmPassword = true;
  passwordMatchMessage = '';

  registerForm = new FormGroup({
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
  });

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
  }

  constructor() {}

  ngOnInit(): void {}
}
