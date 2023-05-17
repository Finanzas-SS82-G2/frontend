import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { StartComponent } from './views/start/start.component';

const routes: Routes = [
  { path: '', component: StartComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
