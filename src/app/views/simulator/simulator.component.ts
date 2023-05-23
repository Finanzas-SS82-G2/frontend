import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.css'],
})
export class SimulatorComponent {
  precioViviendaMax = 464200;
  precioViviendaMin = 65000;

  cuotaInicialMax = 30;
  cuotaInicialMin = 7.5;

  tasaEfectivaAnualMax = 30;
  tasaEfectivaAnualMin = 7.5;

  plazoMesesMax = 300;
  plazoMesesMin = 60;

  simulatorForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.simulatorForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastname: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3)],
        updateOn: 'change',
      }),
      moneda: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'change',
      }),
      ingreso_mensual: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'change',
      }),
      precio_vivienda: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'change',
      }),
      recibio_apoyo_habitacional: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'change',
      }),
      cuota_inicial: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'change',
      }),
      vivienda_sustentable: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'change',
      }),
      tasa_efectiva_anual: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'change',
      }),
      seguro_desgravamen_mensual: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'change',
      }),
      seguro_inmueble_anual: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'change',
      }),
      plazo: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'change',
      }),
      tasa_costo_efectivo_anual: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'change',
      }),
    });

  }

  getMinLengthErrorMessage(element: string, numOfCharacters: number) {
    if (this.simulatorForm.get(element)?.hasError('required')) {
      return 'You must enter a value';
    }
    return this.simulatorForm.get(element)?.hasError('minlength')
      ? `Must have a minimun of ${numOfCharacters} characters`
      : '';
  }

  setSalaryValidation() {
    const salary = this.simulatorForm.get('ingreso_mensual')?.value;

    
  }


  save() {}
}
