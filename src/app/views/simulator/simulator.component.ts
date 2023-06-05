import { Component, OnInit} from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.css'],
})

export class SimulatorComponent implements OnInit {

  precioViviendaMax = 464200;
  precioViviendaMin = 65200;

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
        validators: [Validators.required, Validators.min(500), Validators.max(10000)],
        updateOn: 'change',
      }),
      precio_vivienda: new FormControl(this.precioViviendaMin, {
        validators: [Validators.required, Validators.min(this.precioViviendaMin), Validators.max(this.precioViviendaMax)],
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
      final_initial_fee: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'change',
      }),
      vivienda_sustentable: new FormControl('true', {
        validators: [Validators.required],
        updateOn: 'change',
      }),
      tasa_efectiva_anual: new FormControl(this.tasaEfectivaAnualMin, {
        validators: [Validators.required, Validators.min(this.tasaEfectivaAnualMin), Validators.max(this.tasaEfectivaAnualMax)],
        updateOn: 'change',
      }),
      seguro_desgravamen_mensual: new FormControl(0, {
        validators: [Validators.required, Validators.min(0), Validators.max(5)],
        updateOn: 'change',
      }),
      seguro_inmueble_anual: new FormControl(0, {
        validators: [Validators.required, Validators.min(0), Validators.max(5)],
        updateOn: 'change',
      }),
      plazo: new FormControl(this.plazoMesesMin, {
        validators: [Validators.required],
        updateOn: 'change',
      }),
      tasa_costo_efectivo_anual: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'change',
      }),

      percentage_initial_fee: new FormControl(this.percentageCuotaInicialMin, {
        validators: [Validators.required],
        updateOn: 'change',
      }),

      bono_buen_pagador: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'change',
      }),

      bono_home_sosteinable: new FormControl('true', {
        validators: [Validators.required],
        updateOn: 'change',
      }),

      total_bono: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'change',
      }),

      percentage_cuota_inicial_min: new FormControl(this.percentageCuotaInicialMin, {
        validators: [Validators.required],
        updateOn: 'change',
      }),

      percentage_cuota_inicial_max: new FormControl(this.percentageCuotaInicialMax, {
        validators: [Validators.required],
        updateOn: 'change',
      }),

      bank_loan: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'change',
      }),
      constant_monthly_fee: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'change',
      }),
      
      effective_monthly_rate: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'change',
      }),

    });

    this.initialValuesOfForm();

  }

  initialValuesOfForm() {

    this.calculateInitialFee();
    this.setValueBonoBuenPagador();
    this.setBonoHomeSosteinable();
    this.setTotalBono();
    this.setTotalInitialFee();
    this.setBankLoan();
    this.calculateEffectiveMonthlyRate();
    this.calculateConstantMonthlyFee();
  }

  ngOnInit(): void {

    this.simulatorForm.get('percentage_initial_fee')?.valueChanges.subscribe(value => {
      
      this.calculateInitialFee();

      this.setTotalInitialFee();
      this.setBankLoan();
      this.calculateConstantMonthlyFee();
    });

    this.simulatorForm.get('precio_vivienda')?.valueChanges.subscribe(value => {
      
      this.calculateInitialFee();

      this.setValueBonoBuenPagador();
      this.setMinimunInitialFee();
      this.setBonoHomeSosteinable();
      this.setTotalBono();
      this.setTotalInitialFee();
      this.setBankLoan();
      this.calculateConstantMonthlyFee();
    });

    this.simulatorForm.get('recibio_apoyo_habitacional')?.valueChanges.subscribe(value => {
      this.setValueBonoBuenPagador();
      this.setBonoHomeSosteinable();
      this.setTotalBono();
      this.setTotalInitialFee();
      this.setBankLoan();
      this.calculateConstantMonthlyFee();
    });

    this.simulatorForm.get('vivienda_sustentable')?.valueChanges.subscribe(value => {
      this.setBonoHomeSosteinable();
      this.setTotalBono();
      this.setTotalInitialFee();
      this.setBankLoan();
      this.calculateConstantMonthlyFee();
    });

    this.simulatorForm.get('tasa_efectiva_anual')?.valueChanges.subscribe(value => {
      this.calculateEffectiveMonthlyRate();
      this.calculateConstantMonthlyFee();
    });

    this.simulatorForm.get('plazo')?.valueChanges.subscribe(value => {
      this.calculateConstantMonthlyFee();
    });
    
  }

  calculateEffectiveMonthlyRate(){
    var tasaEfectivaAnual = this.simulatorForm.get('tasa_efectiva_anual')?.value;
    var tasaCostoEfectivoMensual = (Math.pow((1+(tasaEfectivaAnual/100)),(1/12))-1)*100;
    this.simulatorForm.get('effective_monthly_rate')?.setValue(tasaCostoEfectivoMensual);
  }

  calculateConstantMonthlyFee(){
    var effectiveMonthlyRate = this.simulatorForm.get('effective_monthly_rate')?.value;
    var plazo = this.simulatorForm.get('plazo')?.value;
    var bankLoan = this.simulatorForm.get('bank_loan')?.value;
    var constantMonthlyFee = (bankLoan * (effectiveMonthlyRate/100) * Math.pow((1+(effectiveMonthlyRate/100)),plazo)) / (Math.pow((1+(effectiveMonthlyRate/100)),plazo)-1);
    this.simulatorForm.get('constant_monthly_fee')?.setValue(constantMonthlyFee);
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

  setSustainableHome(command: boolean){
    if (command){
      this.simulatorForm.get('vivienda_sustentable')?.setValue('true');
    }
    else{
      this.simulatorForm.get('vivienda_sustentable')?.setValue('false');
    }
  }

  setValueBonoBuenPagador(){
    const valueHome = this.simulatorForm.get('precio_vivienda')?.value;
    var bono : number = 0;
    let recieveHelp = this.simulatorForm.get('recibio_apoyo_habitacional')?.value;
    if(recieveHelp == 'false'){
      if(valueHome >= 65000 && valueHome <= 93100){
        bono = 25700;
      }
      else if(valueHome > 93100 && valueHome <= 139400){
        bono = 21400;
      }
      else if(valueHome > 139400 && valueHome <= 232200){
        bono = 19600;
      }
      else if(valueHome > 232200 && valueHome <= 343900){
        bono = 10800;
      }
      else{
        bono=0
      }
    }
    else{
      bono=0
    }
    this.simulatorForm.get('bono_buen_pagador')?.setValue(bono);
  }

  setBonoHomeSosteinable(){
    const valueHome = this.simulatorForm.get('precio_vivienda')?.value;
    var bono : number = 0;
    let recieveHelp = this.simulatorForm.get('recibio_apoyo_habitacional')?.value;
    let homeSosteinable = this.simulatorForm.get('vivienda_sustentable')?.value;
    if(recieveHelp == 'false' && homeSosteinable == 'true' && valueHome <= 343900){
      bono = 5410;
    }
    else if(valueHome > 343900 || homeSosteinable == 'false' || recieveHelp == 'true'){
      bono = 0;
    }
    this.simulatorForm.get('bono_home_sosteinable')?.setValue(bono);
  }

  setTotalBono(){
    const bonoBuenPagador = this.simulatorForm.get('bono_buen_pagador')?.value;
    const bonoHomeSosteinable = this.simulatorForm.get('bono_home_sosteinable')?.value;
    var totalBono = bonoBuenPagador + bonoHomeSosteinable;
    this.simulatorForm.get('total_bono')?.setValue(totalBono);
  }

  formatSliderLabelPercentaje(value: number) {
    return value + '%';
  }

  setMinimunInitialFee(){
    const valueHome = this.simulatorForm.get('precio_vivienda')?.value;
    const actualPercentage = this.simulatorForm.get('percentage_initial_fee')?.value;
    if(valueHome > 343900  && valueHome <= this.precioViviendaMax){
      this.simulatorForm.get('percentage_cuota_inicial_min')?.setValue(10);
    }
    else{
      this.simulatorForm.get('percentage_cuota_inicial_min')?.setValue(this.percentageCuotaInicialMin);
    }
    this.simulatorForm.get('percentage_initial_fee')?.setValue(this.simulatorForm.get('percentage_cuota_inicial_min')?.value);
  }

  setTotalInitialFee(){
    const totalBono = this.simulatorForm.get('total_bono')?.value;
    const initialFee = this.simulatorForm.get('cuota_inicial')?.value;
    var totalInitialFee = totalBono + initialFee;
    this.simulatorForm.get('final_initial_fee')?.setValue(totalInitialFee);
  }

  setBankLoan(){
    var valueHome = this.simulatorForm.get('precio_vivienda')?.value;
    var totalInitialFee = this.simulatorForm.get('final_initial_fee')?.value;
    var bankLoan = valueHome - totalInitialFee;
    this.simulatorForm.get('bank_loan')?.setValue(bankLoan);
  }

  updatePercentajeInitialFee(){
    const valueHome = this.simulatorForm.get('precio_vivienda')?.value;
    const initialFee = this.simulatorForm.get('cuota_inicial')?.value;
    var percentaje = (initialFee/valueHome)*100;
    var roundedPercentaje = percentaje.toFixed(2);
    this.simulatorForm.get('percentage_initial_fee')?.setValue(roundedPercentaje);
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

  calculateInitialFee(){
    var valueHome = this.simulatorForm.get('precio_vivienda')?.value;
    var percentage = this.simulatorForm.get('percentage_initial_fee')?.value;
    var initialFee = valueHome * percentage/100;
    this.simulatorForm.get('cuota_inicial')?.setValue(initialFee);
  }

}
