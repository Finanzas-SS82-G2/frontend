import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxValidFormComponent } from '../dialog-box-valid-form/dialog-box-valid-form.component';
import { DialogBoxInvalidFormComponent } from '../dialog-box-invalid-form/dialog-box-invalid-form.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(7),
  ]);

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }
    return this.password.hasError('minlength')
      ? 'Must have a minimun of 7 characters'
      : '';
  }

  checkUser() {
    console.log('Email checked');
    var req = new XMLHttpRequest();
    req.open('GET', `https://finanzasrestfulapi.azurewebsites.net/api/v1/users/searchByEmail/${this.email.value}`, false);
    req.send(null);
    if(req.status == 200){
      var user = JSON.parse(req.responseText);
      console.log(user);
      if (user.email == this.email.value) {
        if (user.password == this.password.value) {
          console.log('User logged in');
          this.dialog.open(DialogBoxValidFormComponent, {
            data: { message: 'Usuario logueado exitosamente' },
          });

          localStorage.setItem("id", user.id);

          this.dialog.afterAllClosed.subscribe(result => {
            // Código a ejecutar después de cerrar el diálogo
            this.router.navigate(['/home']);
          });
        } else {
          console.log('Wrong password');
          this.dialog.open(DialogBoxInvalidFormComponent, {
            data: { message: 'Contraseña incorrecta' },
          });
        }
      }
    }
    else {
      console.log('User not registered');
      this.dialog.open(DialogBoxInvalidFormComponent, {
        data: { message: 'Usuario no registrado' },
      });
    }
  }

  constructor(private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {}
}
