import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from '../../shared/shared.module';

import { PassengerService } from '../shared/service/passenger.service';
import { Passenger } from '../shared/models/passenger-registration.model';

import { RegistrationFormComponent } from './registration-form.component';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

const listPassengers: Passenger[] = [
  {
    names: 'Julian',
    lastnames: 'Sanchez',
    nacionality: 'Colombia',
    documentType: 'dni',
    documentNumber: 10612321,
    id: 'gxw9wpavquql3rebs8o'
  }
]

const PassengerServiceMock = {
  savePassenger: () => of(listPassengers),
  getPassenger: () => of(listPassengers)
}

fdescribe('RegistrationFormComponent', () => {
  let component: RegistrationFormComponent;
  let fixture: ComponentFixture<RegistrationFormComponent>;
  let passengerService: PassengerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrationFormComponent],
      imports: [
        FormsModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule,
        FlexLayoutModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatSelectModule,
        MatTableModule,
        MatTooltipModule,
        NoopAnimationsModule,
        SharedModule
      ],
      providers: [
        {
          provide: PassengerService,
          useValue: PassengerServiceMock
        }
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    passengerService = fixture.debugElement.injector.get(PassengerService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('El componente debe iniciar con una sección', () => {
    expect(component.sections.controls.length).toBe(1);
  });
});
