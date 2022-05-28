import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from '../shared/shared.module';

import { PassengerRegistrationRoutingModule } from './passenger-registration-routing.module';

import { PassegerListComponent } from './passeger-list/passeger-list.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';


@NgModule({
  declarations: [
    RegistrationFormComponent,
    PassegerListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    SharedModule,
    PassengerRegistrationRoutingModule,
  ],
  exports: [
    RegistrationFormComponent,
    PassegerListComponent
  ]
})
export class PassengerRegistrationModule { }
