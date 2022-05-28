import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {

  @ViewChild(FormGroupDirective, { static: true }) formGroupDirective!: FormGroupDirective;

  public formulario: FormGroup = this.formBuilder.group({});

  public get secciones() {
    return this.formulario.get('secciones') as FormArray;
  }

  public get validarNumeroSecciones() {
    return this.secciones.length > 3
  }

  constructor(private formBuilder: FormBuilder) {
    this.formulario = formBuilder.group({
      secciones: formBuilder.array([])
    })
  }

  ngOnInit(): void {
    this.agregarSeccion();
  }

  public submit = () => {
    console.log(this.formulario.controls);
  }

  public limpiarSeccion = (index: number) => {
    const seccion = this.secciones.controls[index];
    seccion.reset();
    seccion.markAsTouched();
    seccion.updateValueAndValidity();
  };

  public agregarSeccion = (): void => {
    const seccion = this.formBuilder.group({
      nombres: [null, [Validators.required]],
      apellidos: [null, Validators.required],
      nacionalidad: [null, Validators.required],
      tipoDocumento: [null, Validators.required],
      numeroDocumento: [null, Validators.required]
    });

    this.secciones.push(seccion);

  }
}
