import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PassengerRegistrationRoutingModule } from './passenger-registration-routing.module';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { PassegerListComponent } from './passeger-list/passeger-list.component';


@NgModule({
  declarations: [
    RegistrationFormComponent,
    PassegerListComponent
  ],
  imports: [
    CommonModule,
    PassengerRegistrationRoutingModule
  ],
  exports: [
    RegistrationFormComponent,
    PassegerListComponent
  ]
})
export class PassengerRegistrationModule { }
