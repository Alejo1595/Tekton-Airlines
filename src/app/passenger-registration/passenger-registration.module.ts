import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';


import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from '../shared/shared.module';

import { PassengerRegistrationRoutingModule } from './passenger-registration-routing.module';

import { PassengerListComponent } from './passenger-list/passenger-list.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { PassengerService } from './shared/service/passenger.service';


@NgModule({
  declarations: [
    RegistrationFormComponent,
    PassengerListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatTooltipModule,
    SharedModule,
    PassengerRegistrationRoutingModule,
  ],
  exports: [
    RegistrationFormComponent,
    PassengerListComponent
  ],
  providers: [
    PassengerService
  ]
})
export class PassengerRegistrationModule { }
