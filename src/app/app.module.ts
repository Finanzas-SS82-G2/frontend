import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular Material
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import {MatMenuModule} from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';

// Views
import { StartComponent } from './views/start/start.component';
import { LoginComponent } from './views/login/login.component';
import { SignUpComponent } from './views/sign-up/sign-up.component';
import { HomeComponent } from './views/home/home.component';
import { SimulatorComponent } from './views/simulator/simulator.component';
import { HistoryComponent } from './views/history/history.component';
import { NavbarComponent } from './views/navbar/navbar.component';

import { HttpClientModule } from '@angular/common/http';
import { DialogBoxInvalidFormComponent } from './views/dialog-box-invalid-form/dialog-box-invalid-form.component';
import { DialogBoxValidFormComponent } from './views/dialog-box-valid-form/dialog-box-valid-form.component';
import { CompareComponent } from './views/history/compare-modal/compare/compare.component';
import { DialogPlanDePagosComponent } from './views/dialog-plan-de-pagos/dialog-plan-de-pagos.component';
import { DialogComparacionComponent } from './views/dialog-comparacion/dialog-comparacion.component';
import { PoliciesComponent } from './views/policies/policies.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StartComponent,
    SignUpComponent,
    HomeComponent,
    SimulatorComponent,
    HistoryComponent,
    NavbarComponent,
    DialogBoxInvalidFormComponent,
    DialogBoxValidFormComponent,
    CompareComponent,
    DialogComparacionComponent,
    PoliciesComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatSliderModule,
    MatPaginatorModule,
    HttpClientModule,
    MatDialogModule,
    MatRadioModule,
    MatMenuModule,
    MatCheckboxModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
