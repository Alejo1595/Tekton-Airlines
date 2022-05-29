import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonHarness } from '@angular/material/button/testing';
import { MatCardHarness } from '@angular/material/card/testing';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatSelectHarness } from '@angular/material/select/testing';

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

import { of } from 'rxjs';

import { SharedModule } from '../../shared/shared.module';

import { PassengerService } from '../shared/service/passenger.service';
import { Passenger } from '../shared/models/passenger-registration.model';
import { Catalog } from '../../shared/models/catalog.model';

import { RegistrationFormComponent } from './registration-form.component';
import { CatalogService } from '../../shared/services/catalog.service';

const passenger: Passenger = {
  names: 'Julian',
  lastnames: 'Sanchez',
  nacionality: 'Colombia',
  documentType: 'dni',
  documentNumber: 10612321,
  id: 'gxw9wpavquql3rebs8o'
}

const typeDocuments: Catalog[] = [
  {
    id: 'dni',
    value: 'DNI'
  },
  {
    id: 'ce',
    value: 'CE'
  },
  {
    id: 'pasaporte',
    value: 'Pasaporte'
  }
]

const PassengerServiceMock = {
  savePassenger: () => of([]),
  getPassenger: () => of([])
}

const catalogServiceMock = {
  getCatalog: () => of(typeDocuments)
}

class ComponentTestRoute { };

let loader: HarnessLoader;

describe('RegistrationFormComponent', () => {
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
        RouterTestingModule.withRoutes([
          { path: 'passenger/list', component: ComponentTestRoute }
        ]),
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
        },
        {
          provide: CatalogService,
          useValue: catalogServiceMock
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
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
    passengerService = fixture.debugElement.injector.get(PassengerService);
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('The component must start with a passenger section', () => {
    expect(component.sections.controls.length).toBe(1);
  });

  it('The component should have 4 text type inputs', async () => {
    const inputs = await loader.getAllHarnesses(MatInputHarness);
    expect(inputs.length).toBe(4);
  });

  it('The component should have a select', async () => {
    const selects = await loader.getAllHarnesses(MatSelectHarness);
    expect(selects.length).toBe(1);
  });

  it('The component should have two buttons', async () => {
    const buttons = await loader.getAllHarnesses(MatButtonHarness);
    expect(buttons.length).toBe(2);
  });

  it('AddSection should add a new section by clicking on the new passenger button.', async () => {
    const spyAddSection = spyOn(component, 'addSection').and.callThrough();
    const buttonNewPassenger = await loader.getHarness(MatButtonHarness.with({ text: 'New passenger' }));
    let cards: MatCardHarness[];

    await buttonNewPassenger.click();
    cards = await loader.getAllHarnesses(MatCardHarness);

    expect(spyAddSection).toHaveBeenCalled();
    expect(cards.length).toBe(2);
    expect(component.sections.controls.length).toBe(2);
  });

  it('DeleteSection should remove a section of the form', async () => {
    const spyDeleteSection = spyOn(component, 'deleteSection').withArgs(1).and.callThrough();
    const newPassengetButton = await loader.getHarness(MatButtonHarness.with({ text: 'New passenger' }));
    let deletePassengerButton: MatButtonHarness;
    let cards: MatCardHarness[];

    await newPassengetButton.click();
    deletePassengerButton = await loader.getHarness(MatButtonHarness.with({ text: 'close' }))
    cards = await loader.getAllHarnesses(MatCardHarness);
    expect(cards.length).toBe(2);
    await deletePassengerButton.click();
    cards = await loader.getAllHarnesses(MatCardHarness);

    expect(spyDeleteSection).toHaveBeenCalled();
    expect(cards.length).toBe(1);
  });

  it('submit should display an error message when the form is incorrect', async () => {
    const saveButton = await loader.getHarness(MatButtonHarness.with({ text: 'Save' }));
    let formFields: MatFormFieldHarness[];

    await saveButton.click();
    formFields = await loader.getAllHarnesses(MatFormFieldHarness);

    expect(await formFields[0].getTextErrors()).toEqual(['The field is required']);
    expect(await formFields[1].getTextErrors()).toEqual(['The field is required']);
    expect(await formFields[2].getTextErrors()).toEqual(['The field is required']);
    expect(await formFields[3].getTextErrors()).toEqual(['The field is required']);
  });

  it('Should create a record', async () => {
    const inputNames = await loader.getHarness(MatInputHarness.with({ placeholder: 'Names' }));
    const inputLastNames = await loader.getHarness(MatInputHarness.with({ placeholder: 'Lastnames' }));
    const nacionality = await loader.getHarness(MatInputHarness.with({ placeholder: 'Nacionality' }));
    const documentType = await loader.getHarness(MatSelectHarness);
    const documentNumber = await loader.getHarness(MatInputHarness.with({ placeholder: 'Document number' }));
    const saveButton = await loader.getHarness(MatButtonHarness.with({ text: 'Save' }));

    const spyPassengerService = spyOn(passengerService, 'savePassenger').and.callFake(() => of([]));

    await inputNames.setValue(passenger.names);
    await inputLastNames.setValue(passenger.lastnames);
    await nacionality.setValue(passenger.nacionality);
    
    await documentType.open();
    const options = await documentType.getOptions();
    await options[2].click();

    await documentNumber.setValue(passenger.documentNumber.toString());

    await saveButton.click();

    expect(spyPassengerService).toHaveBeenCalled();

  });
});
