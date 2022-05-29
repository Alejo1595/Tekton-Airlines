import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subject, takeUntil, tap, Observable, shareReplay } from 'rxjs';

import { MessageService } from '../../shared/services/message.service';
import { generateID } from '../../shared/utils/generateID';
import { Catalog } from '../../shared/models/catalog.model';
import { CatalogService } from '../../shared/services/catalog.service';

import { ValidationsDocument, Passenger, DocumentType } from '../shared/models/passenger-registration.model';
import { PassengerService } from '../shared/service/passenger.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {

  @ViewChild(FormGroupDirective, { static: true }) formGroupDirective!: FormGroupDirective;

  public listTypeDocuments$!: Observable<Catalog[]>;

  public form: FormGroup = this.formBuilder.group({});
  public validationsDocument: ValidationsDocument[] = [];
  private unsubscribe$ = new Subject<boolean>();

  public get sections() {
    return this.form.get('sections') as FormArray;
  }

  public get validateSectionNumber() {
    return this.sections.length > 3
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private passengerService: PassengerService,
    public catalogService: CatalogService,
    private messageService: MessageService
  ) {
    this.form = formBuilder.group({
      sections: formBuilder.array([])
    })
  }

  ngOnInit(): void {
    this.listTypeDocuments$ = this.catalogService.getCatalog('TypeDocuments').pipe(shareReplay(1));
    this.loadInformationPassengers();
  }

  public submit = () => {
    if (this.form.invalid) {
      return this.messageService.openSnackBar('Please enter required fields', 'Close');
    }

    this.passengerService.savePassenger(this.generateBody())
      .pipe(
        takeUntil(this.unsubscribe$),
        tap(() => this.resetForm()),
        tap(() => this.messageService.openSnackBar('Record successfully created', 'Close')),
        tap(() => this.router.navigateByUrl('passenger/list'))
      ).subscribe();
  }

  public addSection = (passenger?: Passenger): void => {
    const seccion = this.formBuilder.group({
      names: [passenger ? passenger.names : null, [Validators.required]],
      lastnames: [passenger ? passenger.lastnames : null, [Validators.required]],
      nacionality: [passenger ? passenger.nacionality : null, [Validators.required]],
      documentType: [passenger ? passenger.documentType : null, [Validators.required]],
      documentNumber: [{ value: passenger ? passenger.documentNumber : null, disabled: true }, [Validators.required]]
    });

    this.sections.push(seccion);
    this.validationsDocument.push(this.createBodyValidationDocument());
  }

  public deleteSection = (index: number): void => {
    this.sections.removeAt(index);
  }

  public validateDocumentType = (tipoDocumento: DocumentType, index: number, isReset: boolean = true) => {
    const seccion = this.sections.controls[index];

    if (!seccion || !tipoDocumento) {
      return
    }

    isReset && seccion.get('documentNumber')?.reset();
    seccion.get('documentNumber')?.enable();


    if (tipoDocumento === 'dni') {
      this.validationsDocument[index] = { isOnlyNumbers: true, maxLength: 8 }
    } else if (tipoDocumento === 'ce') {
      this.validationsDocument[index] = { isOnlyNumbers: false, maxLength: 9 }
    } else {
      this.validationsDocument[index] = { isOnlyNumbers: true, maxLength: 9 }
    }
  }

  private loadInformationPassengers = () => {
    this.passengerService.getPassenger()
      .pipe(
        takeUntil(this.unsubscribe$),
        tap(this.loadSectionsForm)
      ).subscribe();
  }

  private createBodyValidationDocument = () => ({ isOnlyNumbers: true, maxLength: 8 })

  private resetForm = () => {
    this.formGroupDirective.resetForm();
    this.sections.clear();
    this.addSection();
  }

  private generateBody() {
    return this.sections.value.map((item: Passenger) => ({ ...item, id: generateID() }));
  }

  private loadSectionsForm = (listadoPasajeros: Passenger[]) => {
    if (listadoPasajeros.length > 0) {
      listadoPasajeros.forEach((pasajero, index: number) => {
        this.addSection(pasajero);
        this.validateDocumentType(pasajero.documentType, index, false)
      })
    } else {
      this.addSection()
    }
  }
}



