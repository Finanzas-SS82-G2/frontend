import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.css'],
})

export class SimulatorComponent implements OnInit {

  precioViviendaMax = 464200;
  precioViviendaMin = 65000;

  percentageCuotaInicialMax = 30;
  percentageCuotaInicialMin = 7.5;

  tasaEfectivaAnualMax = 9.8;
  tasaEfectivaAnualMin = 6.6;

  plazoMesesMax = 300;
  plazoMesesMin = 60;

  simulatorForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.simulatorForm = this.formBuilder.group({
      name: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]*$')],
          updateOn: 'change',
        }),
      lastname: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]*$')],
        updateOn: 'change',
      }),
      moneda: new FormControl('soles', {
        validators: [Validators.required],
        updateOn: 'change',
      }),
      ingreso_mensual: new FormControl('', {
        validators: [Validators.required, Validators.min(499), Validators.max(10001)],
        updateOn: 'change',
      }),
      precio_vivienda: new FormControl('', {
        validators: [Validators.required, Validators.min(this.precioViviendaMin-1), Validators.max(this.precioViviendaMax+1)],
        updateOn: 'change',
      }),
      recibio_apoyo_habitacional: new FormControl('false', {
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

    this.simulatorForm.get('precio_vivienda')?.setValue(this.precioViviendaMin);
    this.simulatorForm.get('cuota_inicial')?.setValue(this.precioViviendaMin*this.percentageCuotaInicialMin/100);

  }

  ngOnInit(): void {
    
  }

  getMinLengthErrorMessage(element: string, numOfCharacters: number) {
    if (this.simulatorForm.get(element)?.hasError('required')) {
      return 'Debes ingresar un valor';
    }
    return this.simulatorForm.get(element)?.hasError('minlength')
      ? `Debe tener mínimo ${numOfCharacters} caracteres`
      : '';
  }

  getOnlyLettersErrorMessage(element: string) {
    if (this.simulatorForm.get(element)?.hasError('required')) {
      return 'Debes ingresar un valor';
    }
    else if (this.simulatorForm.get(element)?.hasError('minlength')) {
      return 'Mínimo 3 caracteres';
    }
    return this.simulatorForm.get(element)?.hasError('pattern')
      ? 'Debe ingresar un nombre válido'
      : '';
  }

  getMinValueErrorMessage(element: string, minValue: number) {
    if (this.simulatorForm.get(element)?.hasError('required')) {
      return 'Debes ingresar un valor';
    }
    return this.simulatorForm.get(element)?.hasError('min')
      ? `Debe ser mínimo ${minValue}`
      : '';
  }

  getMaxValueErrorMessage(element: string, maxValue: number) {
    if (this.simulatorForm.get(element)?.hasError('required')) {
      return 'Debes ingresar un valor';
    }
    return this.simulatorForm.get(element)?.hasError('max')
      ? `Debe ser maximo ${maxValue}`
      : '';
  }


  save() {}

  verifyMoney(){
    if (this.simulatorForm.get('moneda')?.value == 'soles'){
      return 'S/. ';
    }
    else{
      return '$/. ';
    }
  }

  setMoney(moneda: string){
    this.simulatorForm.get('moneda')?.setValue(moneda);
  }

  setHousingSupport(command: boolean){
    if (command){
      this.simulatorForm.get('recibio_apoyo_habitacional')?.setValue('true');
    }
    else{
      this.simulatorForm.get('recibio_apoyo_habitacional')?.setValue('false');
    } 
  }

  
  setValueBonoBuenPagador(){
    if(this.simulatorForm.get('recibio_apoyo_habitacional')?.value == 'si'){
      this.simulatorForm.get('recibio_apoyo_habitacional')?.setValue('no');
    }
  }

  formatSliderLabelPercentaje(value: number) {
    return value + '%';
  }

  setInitialFee(){
    this.simulatorForm.get('cuota_inicial')?.setValue(this.simulatorForm.get('precio_vivienda')?.value*this.simulatorForm.get('porcentaje_cuota_inicial')?.value/100);
  }

}
