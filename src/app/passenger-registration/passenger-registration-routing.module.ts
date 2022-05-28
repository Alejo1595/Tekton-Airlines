import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { PassegerListComponent } from './passeger-list/passeger-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'registration-form',
    pathMatch: 'full'
  },
  {
    path: 'registration-form',
    component: RegistrationFormComponent
  },
  {
    path: 'passenger-list',
    component: PassegerListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PassengerRegistrationRoutingModule { }
