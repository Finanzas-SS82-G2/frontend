import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { HomeComponent } from './views/home/home.component';
import { StartComponent } from './views/start/start.component';
import { LoginComponent } from './views/login/login.component';
import { SignUpComponent } from './views/sign-up/sign-up.component';

const routes: Routes = [
  { path: '', component: StartComponent,
    children: [
      { path: 'sign-up', component: SignUpComponent },
      { path: 'login', component: LoginComponent},
      { path: '', redirectTo: 'login', pathMatch: 'full'}
    ]
  },

  { path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
