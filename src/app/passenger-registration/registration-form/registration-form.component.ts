import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Subject, takeUntil, tap } from 'rxjs';
import { ValidacionesDocumento, Passenger } from '../shared/models/passenger-registration.model';
import { PassengerService } from '../shared/service/passenger.service';
import { MessageService } from '../../shared/services/message.service';
import { Router } from '@angular/router';
import { generateID } from '../../shared/utils/generateID';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {

  @ViewChild(FormGroupDirective, { static: true }) formGroupDirective!: FormGroupDirective;

  public listadoTipoDocumentos = [
    {
      id: 'dni',
      valor: 'DNI'
    },
    {
      id: 'ce',
      valor: 'CE'
    },
    {
      id: 'pasaporte',
      valor: 'Pasaporte'
    }
  ];
  public formulario: FormGroup = this.formBuilder.group({});
  public validacionesDocumento: ValidacionesDocumento[] = [];
  private unsubscribe$ = new Subject<boolean>();

  public get secciones() {
    return this.formulario.get('secciones') as FormArray;
  }

  public get validarNumeroSecciones() {
    return this.secciones.length > 3
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private passengerService: PassengerService,
    private messageService: MessageService
  ) {
    this.formulario = formBuilder.group({
      secciones: formBuilder.array([])
    })
  }

  ngOnInit(): void {
    this.agregarSeccion();
  }

  public submit = () => {
    if (this.formulario.invalid) {
      return this.messageService.openSnackBar('Por favor ingrese los campos obligatorios', 'Cerrar');
    }

    this.passengerService.savePassenger(this.generateBody())
      .pipe(
        takeUntil(this.unsubscribe$),
        tap(() => this.reiniciarFormulario()),
        tap(() => this.messageService.openSnackBar('Registro creado exitosamente', 'Cerrar')),
        tap(() => this.router.navigateByUrl('passenger/list'))
      ).subscribe();
  }

  public agregarSeccion = (): void => {
    const seccion = this.formBuilder.group({
      nombres: [null, [Validators.required]],
      apellidos: [null, [Validators.required]],
      nacionalidad: [null, [Validators.required]],
      tipoDocumento: [null, [Validators.required]],
      numeroDocumento: [{ value: null, disabled: true }, [Validators.required]]
    });

    this.secciones.push(seccion);
    this.validacionesDocumento.push(this.crearCuerpoValidacionDocumento());
  }

  public eliminarSeccion = (index: number): void => {
    this.secciones.removeAt(index);
  }

  public validarTipoDocumento = (tipoDocumento: 'dni' | 'ce' | 'pasaporte', index: number) => {
    const seccion = this.secciones.controls[index];

    if (!seccion || !tipoDocumento) {
      return
    }

    seccion.get('numeroDocumento')?.reset();
    seccion.get('numeroDocumento')?.enable();


    if (tipoDocumento === 'dni') {
      this.validacionesDocumento[index] = { isOnlyNumbers: true, maxLength: 8 }
    } else if (tipoDocumento === 'ce') {
      this.validacionesDocumento[index] = { isOnlyNumbers: false, maxLength: 9 }
    } else {
      this.validacionesDocumento[index] = { isOnlyNumbers: true, maxLength: 9 }
    }
  }

  private crearCuerpoValidacionDocumento = () => ({ isOnlyNumbers: true, maxLength: 8 })

  private reiniciarFormulario = () => {
    this.formGroupDirective.resetForm();
    this.secciones.clear();
    this.agregarSeccion();
  }

  private generateBody() {
    return this.secciones.value.map((item: Passenger) => ({ ...item, id: generateID() }));
  }
}



