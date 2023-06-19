import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogPlanDePagosComponent } from 'src/app/views/dialog-plan-de-pagos/dialog-plan-de-pagos.component';
import { PlanDePagos } from 'src/app/models/plan-de-pagos';
import { Cuota } from 'src/app/models/plan-de-pagos';
import { toNumber } from 'lodash';

@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.css'],
})
export class SimulatorComponent implements OnInit {
  seguroBancosDefecto: SeguroBancos[] = [
    {
      id: 1,
      nombre: 'BanBif',
      seguroDesgravamen: 0.111,
      seguroInmueble: 0.031,
    },
    {
      id: 2,
      nombre: 'Banco de Credito',
      seguroDesgravamen: 0.03,
      seguroInmueble: 0.021,
    },
    {
      id: 3,
      nombre: 'Banco GNB',
      seguroDesgravamen: 0.052,
      seguroInmueble: 0.0219,
    },
    {
      id: 4,
      nombre: 'Banco Pichincha',
      seguroDesgravamen: 0.09,
      seguroInmueble: 0.026,
    },
    {
      id: 5,
      nombre: 'BBVA',
      seguroDesgravamen: 0.0439,
      seguroInmueble: 0.021,
    },
    {
      id: 6,
      nombre: 'Interbank',
      seguroDesgravamen: 0.052,
      seguroInmueble: 0.025,
    },
    {
      id: 7,
      nombre: 'Scotiabank',
      seguroDesgravamen: 0.0546,
      seguroInmueble: 0.028,
    },
    {
      id: 8,
      nombre: 'Banco de Comercio',
      seguroDesgravamen: 0.075,
      seguroInmueble: 3.00,
    },
    {
      id: 9,
      nombre: 'CMAC Huancayo',
      seguroDesgravamen: 0.0800,
      seguroInmueble: 0.0207,
    },
    {
      id: 10,
      nombre: 'CMAC Ica',
      seguroDesgravamen: 0.001097,
      seguroInmueble: 0.00038,
    },
    {
      id: 11,
      nombre: 'CMAC Cusco',
      seguroDesgravamen: 0.05,
      seguroInmueble: 0.35,
    },
    {
      id: 12,
      nombre: 'CMAC Trujillo',
      seguroDesgravamen: 0.1080,
      seguroInmueble: 0.0340,
    },
    {
      id: 13,
      nombre: 'CMAC Maynas',
      seguroDesgravamen: 1.000,
      seguroInmueble: 0.020,
    },
    {
      id: 14,
      nombre: 'CMAC Arequipa',
      seguroDesgravamen: 0.0500,
      seguroInmueble: 0.027,
    },
    {
      id: 15,
      nombre: 'Financiera Efectiva',
      seguroDesgravamen: 2.90,
      seguroInmueble: 0.0677963,
    },
    {
      id: 16,
      nombre: 'Financiera CrediScotia',
      seguroDesgravamen: 0.0299,
      seguroInmueble: 0.0280,
    },
    {
      id: 17,
      nombre: 'Empresa Crédito Vívela',
      seguroDesgravamen: 0.0670,
      seguroInmueble: 0.0230,
    },
  ];

  bancoElegido: SeguroBancos = this.seguroBancosDefecto[0];

  precioViviendaMax = 464200;
  precioViviendaMin = 65200;
  sueldoMax = 100000;
  sueldoMin = 500;

  percentageCuotaInicialMax = 30;
  percentageCuotaInicialMin = 7.5;

  tasaEfectivaAnualMax = 9.8;
  tasaEfectivaAnualMin = 6.6;

  plazoMesesMax = 300;
  plazoMesesMin = 60;

  simulatorForm!: FormGroup;

  _tasaEfectivaMensual: number = 0;
  _seguroDesgravamenPorcentaje: number = 0;
  _seguroViviendaPorcentaje: number = 0;
  _plazoPago: number = 0;
  _periodoGracia: number = 0;
  _financiamientoBancario: number = 0;

  _listSaldoInicialPeriodo: number[] = [];
  _listInteresPeriodo: number[] = [];
  _listAmortizacionPeriodo: number[] = [];
  _cuotaFrances: number = 0;
  _listSaldoFinalPeriodo: number[] = [];
  _listSeguroDesgravamen: number[] = [];
  _seguroVivienda: number = 0;
  _listCuotaMensualFinalPeriodo: number[] = [];
  _cuotaFinalEstandarizada: number = 0;

  _TIR: number = 0;
  _TCEA: number = 0;
  _VAN: number = 0;

  changeDivise : number = 3.64;

  planDePagos: PlanDePagos = {
    nombre: '',
    apellido: '',
    moneda: '',
    importePrestamo: 0,
    bonoBuenPagador: 0,
    plazoPago: 0,
    porcSeguroDesgravamen: 0,
    porcSeguroVivienda: 0,
    cuotaInicial: 0,
    valorVivienda: 0,
    tcea: 0,
    van: 0,
    planDePagos: [],
  };

  cuotaCalculada: Boolean = true;

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog) {
    this.simulatorForm = this.formBuilder.group({
      name: new FormControl('', {
      //name: new FormControl('Abel', {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('^[a-zA-Z ]*$'),
        ],
        updateOn: 'change',
      }),
      lastname: new FormControl('', {
      //lastname: new FormControl('Cierto', {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('^[a-zA-Z ]*$'),
        ],
        updateOn: 'change',
      }),
      moneda: new FormControl('soles', {
        validators: [Validators.required],
        updateOn: 'change',
      }),
      ingreso_mensual: new FormControl(0, {
      //ingreso_mensual: new FormControl(this.sueldoMin, {
        validators: [
          Validators.required,
          Validators.min(this.sueldoMin),
          Validators.max(this.sueldoMax),
        ],
        updateOn: 'change',
      }),
      precio_vivienda: new FormControl(this.precioViviendaMin, {
      //precio_vivienda: new FormControl(153900, {
        validators: [
          Validators.required,
          Validators.min(this.precioViviendaMin),
          Validators.max(this.precioViviendaMax),
        ],
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
        validators: [
          Validators.required,
          Validators.min(this.tasaEfectivaAnualMin),
          Validators.max(this.tasaEfectivaAnualMax),
        ],
        updateOn: 'change',
      }),
      seguros_banco: new FormControl(this.seguroBancosDefecto[0], {
        validators: [Validators.required],
        updateOn: 'change',
      }),
      seguro_desgravamen_mensual: new FormControl(
        this.seguroBancosDefecto[0].seguroDesgravamen,
        {
          validators: [
            Validators.required,
            Validators.min(0),
            Validators.max(5),
          ],
          updateOn: 'change',
        }
      ),
      seguro_inmueble_anual: new FormControl(
        this.seguroBancosDefecto[0].seguroInmueble,
        {
          validators: [
            Validators.required,
            Validators.min(0),
            Validators.max(5),
          ],
          updateOn: 'change',
        }
      ),
      plazo: new FormControl(this.plazoMesesMin,{
      //plazo: new FormControl(180, {
        validators: [Validators.required],
        updateOn: 'change',
      }),
      percentage_initial_fee: new FormControl(this.percentageCuotaInicialMin,{
      //percentage_initial_fee: new FormControl(15, {
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

      percentage_cuota_inicial_min: new FormControl(
        this.percentageCuotaInicialMin,
        {
          validators: [Validators.required],
          updateOn: 'change',
        }
      ),

      percentage_cuota_inicial_max: new FormControl(
        this.percentageCuotaInicialMax,
        {
          validators: [Validators.required],
          updateOn: 'change',
        }
      ),

      bank_loan: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'change',
      }),
      effective_monthly_rate: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'change',
      }),

      periodo_gracia: new FormControl(0, {
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
  }

  ngOnInit(): void {
    this.precioViviendaMax = 464200;
    this.precioViviendaMin = 65200;

    this.percentageCuotaInicialMax = 30;
    this.percentageCuotaInicialMin = 7.5;

    this.tasaEfectivaAnualMax = 9.8;
    this.tasaEfectivaAnualMin = 6.6;

    this.plazoMesesMax = 300;
    this.plazoMesesMin = 60;

    //this.simulatorForm! =

    this._tasaEfectivaMensual = 0;
    this._seguroDesgravamenPorcentaje = 0;
    this._seguroViviendaPorcentaje = 0;
    this._plazoPago = 0;
    this._periodoGracia = 0;
    this._financiamientoBancario = 0;

    this._listSaldoInicialPeriodo = [];
    this._listInteresPeriodo = [];
    this._listAmortizacionPeriodo = [];
    this._cuotaFrances = 0;
    this._listSaldoFinalPeriodo = [];
    this._listSeguroDesgravamen = [];
    this._seguroVivienda = 0;
    this._listCuotaMensualFinalPeriodo = [];
    this._cuotaFinalEstandarizada = 0;

    this._TIR = 0;
    this._TCEA = 0;

    this.planDePagos = {
      nombre: '',
      apellido: '',
      moneda: '',
      importePrestamo: 0,
      bonoBuenPagador: 0,
      plazoPago: 0,
      porcSeguroDesgravamen: 0,
      porcSeguroVivienda: 0,
      cuotaInicial: 0,
      planDePagos: [],
      valorVivienda: 0,
      tcea: 0,
      van: 0,
    };

    this.cuotaCalculada = false;



    this.simulatorForm
      .get('percentage_initial_fee')
      ?.valueChanges.subscribe((value) => {
        this.calculateInitialFee();
        this.setTotalInitialFee();
        this.setBankLoan();
      });

    this.simulatorForm
      .get('precio_vivienda')
      ?.valueChanges.subscribe((value) => {
        this.calculateInitialFee();
        this.setValueBonoBuenPagador();
        this.setMinimunInitialFee();
        this.setBonoHomeSosteinable();
        this.setTotalBono();
        this.setTotalInitialFee();
        this.setBankLoan();
      });

    this.simulatorForm
      .get('recibio_apoyo_habitacional')
      ?.valueChanges.subscribe((value) => {
        this.setValueBonoBuenPagador();
        this.setBonoHomeSosteinable();
        this.setTotalBono();
        this.setTotalInitialFee();
        this.setBankLoan();
      });

    this.simulatorForm
      .get('vivienda_sustentable')
      ?.valueChanges.subscribe((value) => {
        this.setBonoHomeSosteinable();
        this.setTotalBono();
        this.setTotalInitialFee();
        this.setBankLoan();
      });

    this.simulatorForm
      .get('tasa_efectiva_anual')
      ?.valueChanges.subscribe((value) => {
        this.calculateEffectiveMonthlyRate();
      });

    this.simulatorForm.get('seguros_banco')?.valueChanges.subscribe((value) => {
      this.changeSelectedBank();
    });
  }

  calculateEffectiveMonthlyRate() {
    var tasaEfectivaAnual = this.simulatorForm.get(
      'tasa_efectiva_anual'
    )?.value;
    var tasaEfectivoMensual =
      (Math.pow(1 + tasaEfectivaAnual / 100, 1 / 12) - 1) * 100;
    this.simulatorForm
      .get('effective_monthly_rate')
      ?.setValue(tasaEfectivoMensual);
    this._tasaEfectivaMensual = tasaEfectivoMensual;
  }

  calculateInitialFee() {
    var valueHome = this.simulatorForm.get('precio_vivienda')?.value;
    var percentage = this.simulatorForm.get('percentage_initial_fee')?.value;
    var initialFee = (valueHome * percentage) / 100;
    this.simulatorForm.get('cuota_inicial')?.setValue(initialFee);
  }

  elaborarCronogramaDePagos() {
    this.calculateEffectiveMonthlyRate();
    this._seguroDesgravamenPorcentaje = this.simulatorForm.get(
      'seguro_desgravamen_mensual'
    )?.value;
    this._seguroViviendaPorcentaje = this.simulatorForm.get(
      'seguro_inmueble_anual'
    )?.value;
    this._financiamientoBancario = this.simulatorForm.get('bank_loan')?.value;
    this._plazoPago = this.simulatorForm.get('plazo')?.value;
    this._periodoGracia = this.simulatorForm.get('periodo_gracia')?.value;
    this._seguroVivienda =
      this.simulatorForm.get('precio_vivienda')?.value *
      (this._seguroViviendaPorcentaje / 100);

    var saldoInicialPeriodo = this._financiamientoBancario;
    var InteresPeriodo = 0;
    var amortizacionPeriodo = 0;
    var saldoFinalPeriodo = this._financiamientoBancario;
    var seguroDesgravamen = 0;
    var cuotaPeriodo = 0;
    var nuevoCapital = 0;

    var suma = 0;

    if (this._periodoGracia > 0) {
      for (let i = 0; i < this._periodoGracia + 1; i++) {
        this._listSaldoInicialPeriodo.push(saldoInicialPeriodo);
        this._listInteresPeriodo.push(InteresPeriodo);
        this._listAmortizacionPeriodo.push(amortizacionPeriodo);
        this._listSaldoFinalPeriodo.push(saldoFinalPeriodo);
        this._listSeguroDesgravamen.push(seguroDesgravamen);
        this._listCuotaMensualFinalPeriodo.push(cuotaPeriodo);
        //Calculo de interes que se va sumar al capital
        if (i < this._periodoGracia) {
          saldoInicialPeriodo = this._listSaldoFinalPeriodo[i];
          InteresPeriodo =
            saldoInicialPeriodo * (this._tasaEfectivaMensual / 100);
          amortizacionPeriodo = 0;
          seguroDesgravamen =
            saldoInicialPeriodo * (this._seguroDesgravamenPorcentaje / 100);
          saldoFinalPeriodo =
            saldoInicialPeriodo +
            InteresPeriodo +
            seguroDesgravamen +
            this._seguroVivienda;
          cuotaPeriodo = 0;
        }
      }
      nuevoCapital = this._listSaldoFinalPeriodo[this._periodoGracia];
      this._cuotaFrances =
        (nuevoCapital *
          (this._tasaEfectivaMensual / 100) *
          Math.pow(
            1 + this._tasaEfectivaMensual / 100,
            this._plazoPago - this._periodoGracia
          )) /
        (Math.pow(
          1 + this._tasaEfectivaMensual / 100,
          this._plazoPago - this._periodoGracia
        ) -
          1);
      saldoInicialPeriodo = nuevoCapital;
      InteresPeriodo = saldoInicialPeriodo * (this._tasaEfectivaMensual / 100);
      amortizacionPeriodo = this._cuotaFrances - InteresPeriodo;
      saldoFinalPeriodo = saldoInicialPeriodo - amortizacionPeriodo;
      seguroDesgravamen =
        saldoInicialPeriodo * (this._seguroDesgravamenPorcentaje / 100);
      cuotaPeriodo =
        this._cuotaFrances + seguroDesgravamen + this._seguroVivienda;
      for (let i = 0; i < this._plazoPago - this._periodoGracia; i++) {
        this._listSaldoInicialPeriodo.push(saldoInicialPeriodo);
        this._listInteresPeriodo.push(InteresPeriodo);
        this._listAmortizacionPeriodo.push(amortizacionPeriodo);
        this._listSaldoFinalPeriodo.push(saldoFinalPeriodo);
        this._listSeguroDesgravamen.push(seguroDesgravamen);
        this._listCuotaMensualFinalPeriodo.push(cuotaPeriodo);
        //Calculos para el periodo 1
        if (i < this._plazoPago - this._periodoGracia) {
          saldoInicialPeriodo =
            this._listSaldoFinalPeriodo[this._periodoGracia + i + 1];
          InteresPeriodo =
            saldoInicialPeriodo * (this._tasaEfectivaMensual / 100);
          amortizacionPeriodo = this._cuotaFrances - InteresPeriodo;
          saldoFinalPeriodo = saldoInicialPeriodo - amortizacionPeriodo;
          seguroDesgravamen =
            saldoInicialPeriodo * (this._seguroDesgravamenPorcentaje / 100);
          cuotaPeriodo =
            this._cuotaFrances + seguroDesgravamen + this._seguroVivienda;
        }
      }

      for (let i = 0; i < this._listCuotaMensualFinalPeriodo.length; i++) {
        suma = suma + this._listCuotaMensualFinalPeriodo[i];
      }
      this._cuotaFinalEstandarizada = suma / (this._plazoPago - this._periodoGracia);
      this.cuotaCalculada = true;
    } else {
      this._cuotaFrances =
        (this._financiamientoBancario *
          (this._tasaEfectivaMensual / 100) *
          Math.pow(1 + this._tasaEfectivaMensual / 100, this._plazoPago)) /
        (Math.pow(1 + this._tasaEfectivaMensual / 100, this._plazoPago) - 1);
        console.log('Cuota Frances' + this._cuotaFrances);
      for (let i = 0; i < this._plazoPago + 1; i++) {
        this._listSaldoInicialPeriodo.push(saldoInicialPeriodo);
        this._listInteresPeriodo.push(InteresPeriodo);
        this._listAmortizacionPeriodo.push(amortizacionPeriodo);
        this._listSaldoFinalPeriodo.push(saldoFinalPeriodo);
        this._listSeguroDesgravamen.push(seguroDesgravamen);
        this._listCuotaMensualFinalPeriodo.push(cuotaPeriodo);
        //Calculos para el periodo 1
        if (i < this._plazoPago) {
          saldoInicialPeriodo = this._listSaldoFinalPeriodo[i];
          InteresPeriodo =
            saldoInicialPeriodo * (this._tasaEfectivaMensual / 100);
          amortizacionPeriodo = this._cuotaFrances - InteresPeriodo;
          saldoFinalPeriodo = saldoInicialPeriodo - amortizacionPeriodo;
          seguroDesgravamen =
            saldoInicialPeriodo * (this._seguroDesgravamenPorcentaje / 100);
          cuotaPeriodo =
            this._cuotaFrances + seguroDesgravamen + this._seguroVivienda;
        }
      }

      for (let i = 0; i < this._listCuotaMensualFinalPeriodo.length; i++) {
        suma = suma + this._listCuotaMensualFinalPeriodo[i];
      }
      this._cuotaFinalEstandarizada = suma / this._plazoPago;
      this.cuotaCalculada = true;
    }
    this.calculateVAN();
    this.calculateTIR();
    this.calculateTCEA();
    this.mostrarTabla();
  }

  calculateTCEA() {
    this._TCEA = (Math.pow(1 + this._TIR / 100, 12) - 1) * 100;
    console.log('TCEA: ' + this._TCEA);
  }

  calculateTIR() {
    let i1 = this._tasaEfectivaMensual;
    console.log('i1: ' + i1);
    let van1 = this._VAN;
    console.log('van1: ' + van1);
    let tir = 0;
    let van2 = 0;
    let i2 = i1 + 0.1567345679999999999;
    console.log('i2: ' + i2);
    //Calculamos el VAN para i2
    if (this._periodoGracia > 0) {
      for (let i = 0; i < this._plazoPago - this._periodoGracia; i++) {
        van2 =
          van2 + this._cuotaFinalEstandarizada / Math.pow(1+ i2 / 100, i + 1);
      }
    } else {
      for (let i = 0; i < this._plazoPago; i++) {
        van2 = van2 + this._cuotaFinalEstandarizada / Math.pow(1 + i2 / 100, i + 1);
      }
    }
    van2 = van2 - this._financiamientoBancario;
    console.log('van2: ' + van2);
    tir = i1/100 + (i2/100 - i1/100) * (van1 / (van1 - van2));
    this._TIR = tir*100;
    console.log('TIR: ' + this._TIR);
  }

  calculateVAN() {
    let sumaVAN = 0;
    let VAN = 0;
    if (this._periodoGracia > 0) {
      for (let i = 0; i < this._plazoPago - this._periodoGracia; i++) {
        VAN =
          this._cuotaFinalEstandarizada /
          Math.pow(1 + this._tasaEfectivaMensual / 100, i + 1);
        sumaVAN = sumaVAN + VAN;
      }
    } else {
      for (let i = 0; i < this._plazoPago; i++) {
        VAN = this._cuotaFinalEstandarizada / Math.pow(1 + this._tasaEfectivaMensual / 100, i + 1);
        sumaVAN = sumaVAN + VAN;
      }
    }
    this._VAN = sumaVAN - this._financiamientoBancario;
  }

  save() {}

  verifyMoney() {
    if (this.simulatorForm.get('moneda')?.value == 'soles') {
      this.precioViviendaMax = 464200;
      this.precioViviendaMin = 65200;
      this.sueldoMax = 100000;
      this.sueldoMin = 500;
      this.simulatorForm.get('precio_vivienda')?.setValidators([Validators.min(this.precioViviendaMin), Validators.max(this.precioViviendaMax)]);
      this.simulatorForm.get('ingreso_mensual')?.setValidators([Validators.min(this.sueldoMin), Validators.max(this.sueldoMax)]);
      this.simulatorForm.get('precio_vivienda')?.setValue(this.precioViviendaMin);
      return 'S/. ';
    } else {
      this.precioViviendaMax = toNumber((464200/this.changeDivise).toFixed(2));
      this.precioViviendaMin = toNumber((65200/this.changeDivise).toFixed(2));
      this.sueldoMax = toNumber((100000/this.changeDivise).toFixed(2));
      this.sueldoMin = toNumber((500/this.changeDivise).toFixed(2));
      this.simulatorForm.get('precio_vivienda')?.setValidators([Validators.min(this.precioViviendaMin), Validators.max(this.precioViviendaMax)]);
      this.simulatorForm.get('ingreso_mensual')?.setValidators([Validators.min(this.sueldoMin), Validators.max(this.sueldoMax)]);
      this.simulatorForm.get('precio_vivienda')?.setValue(this.precioViviendaMin);
      return '$/. ';
    }
  }

  setMoney(moneda: string) {
    this.simulatorForm.get('moneda')?.setValue(moneda);
  }

  setHousingSupport(command: boolean) {
    if (command) {
      this.simulatorForm.get('recibio_apoyo_habitacional')?.setValue('true');
    } else {
      this.simulatorForm.get('recibio_apoyo_habitacional')?.setValue('false');
    }
  }

  setSustainableHome(command: boolean) {
    if (command) {
      this.simulatorForm.get('vivienda_sustentable')?.setValue('true');
    } else {
      this.simulatorForm.get('vivienda_sustentable')?.setValue('false');
    }
  }

  setValueBonoBuenPagador() {
    const valueHome = this.simulatorForm.get('precio_vivienda')?.value;
    var bono: number = 0;
    let recieveHelp = this.simulatorForm.get(
      'recibio_apoyo_habitacional'
    )?.value;
    if (recieveHelp == 'false') {
      if (this.simulatorForm.get('moneda')?.value == 'soles') {
        if (valueHome >= 65000 && valueHome <= 93100) {
          bono = 25700;
        } else if (valueHome > 93100 && valueHome <= 139400) {
          bono = 21400;
        } else if (valueHome > 139400 && valueHome <= 232200) {
          bono = 19600;
        } else if (valueHome > 232200 && valueHome <= 343900) {
          bono = 10800;
        } else {
          bono = 0;
        }
      }
      else{
        if (valueHome >= 65000/this.changeDivise && valueHome <= 93100/this.changeDivise) {
          bono = 25700/this.changeDivise;
        } else if (valueHome > 93100/this.changeDivise && valueHome <= 139400/this.changeDivise) {
          bono = 21400;
        } else if (valueHome > 139400/this.changeDivise && valueHome <= 232200/this.changeDivise) {
          bono = 19600/this.changeDivise;
        } else if (valueHome > 232200/this.changeDivise && valueHome <= 343900/this.changeDivise) {
          bono = 10800/this.changeDivise;
        } else {
          bono = 0;
        }
      }
      
    } else {
      bono = 0;
    }
    this.simulatorForm.get('bono_buen_pagador')?.setValue(bono);
  }

  setBonoHomeSosteinable() {
    const valueHome = this.simulatorForm.get('precio_vivienda')?.value;
    var bono: number = 0;
    let recieveHelp = this.simulatorForm.get('recibio_apoyo_habitacional')?.value;
    let homeSosteinable = this.simulatorForm.get('vivienda_sustentable')?.value;
    if (this.simulatorForm.get('moneda')?.value == 'soles'){
      if (recieveHelp == 'false' && homeSosteinable == 'true' && valueHome <= 343900) {
        bono = 5410;
      } 
      else if (valueHome > 343900 || homeSosteinable == 'false' || recieveHelp == 'true') {
        bono = 0;
      }
    }
    else{
      if (recieveHelp == 'false' && homeSosteinable == 'true' && valueHome <= 343900/this.changeDivise) {
        bono = 5410/this.changeDivise;
      } 
      else if (valueHome > 343900/this.changeDivise || homeSosteinable == 'false' || recieveHelp == 'true') {
        bono = 0;
      }
    }
    
    this.simulatorForm.get('bono_home_sosteinable')?.setValue(bono);
  }

  setTotalBono() {
    const bonoBuenPagador = this.simulatorForm.get('bono_buen_pagador')?.value;
    const bonoHomeSosteinable = this.simulatorForm.get(
      'bono_home_sosteinable'
    )?.value;
    var totalBono = bonoBuenPagador + bonoHomeSosteinable;
    this.simulatorForm.get('total_bono')?.setValue(totalBono);
  }

  formatSliderLabelPercentaje(value: number) {
    return value + '%';
  }

  setMinimunInitialFee() {
    const valueHome = this.simulatorForm.get('precio_vivienda')?.value;
    const actualPercentage = this.simulatorForm.get('percentage_initial_fee')?.value;
    if(this.simulatorForm.get('moneda')?.value == 'soles'){
      if (valueHome > 343900 && valueHome <= this.precioViviendaMax) {
        this.simulatorForm.get('percentage_cuota_inicial_min')?.setValue(10);
      } else {
        this.simulatorForm
          .get('percentage_cuota_inicial_min')
          ?.setValue(this.percentageCuotaInicialMin);
      }
    }
    else{
      if (valueHome > 343900/this.changeDivise && valueHome <= this.precioViviendaMax) {
        this.simulatorForm.get('percentage_cuota_inicial_min')?.setValue(10);
      } else {
        this.simulatorForm
          .get('percentage_cuota_inicial_min')
          ?.setValue(this.percentageCuotaInicialMin);
      }
    }
    this.simulatorForm
      .get('percentage_initial_fee')
      ?.setValue(this.simulatorForm.get('percentage_cuota_inicial_min')?.value);
  }

  setTotalInitialFee() {
    const totalBono = this.simulatorForm.get('total_bono')?.value;
    const initialFee = this.simulatorForm.get('cuota_inicial')?.value;
    var totalInitialFee = totalBono + initialFee;
    this.simulatorForm.get('final_initial_fee')?.setValue(totalInitialFee);
  }

  setBankLoan() {
    var valueHome = this.simulatorForm.get('precio_vivienda')?.value;
    var totalInitialFee = this.simulatorForm.get('final_initial_fee')?.value;
    var bankLoan = valueHome - totalInitialFee;
    this.simulatorForm.get('bank_loan')?.setValue(bankLoan);
    this._financiamientoBancario = bankLoan;
  }

  updatePercentajeInitialFee() {
    const valueHome = this.simulatorForm.get('precio_vivienda')?.value;
    const initialFee = this.simulatorForm.get('cuota_inicial')?.value;
    var percentaje = (initialFee / valueHome) * 100;
    var roundedPercentaje = percentaje.toFixed(2);
    this.simulatorForm
      .get('percentage_initial_fee')
      ?.setValue(roundedPercentaje);
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
    } else if (this.simulatorForm.get(element)?.hasError('minlength')) {
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

  /* Para crear la tabla y mostrar el plan de pagos */
  mostrarTabla() {
    this.dataToPlanDePagos();
    const dialogRef = this.dialog.open(DialogPlanDePagosComponent, {
      data: {
        planDePagos: this.planDePagos,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      //this.ngOnInit();
      console.log('The dialog was closed');
      this.ngOnInit();
    });
  }

  dataToPlanDePagos() {
    this.planDePagos.nombre = this.simulatorForm.get('name')?.value;
    this.planDePagos.apellido = this.simulatorForm.get('lastname')?.value;
    this.planDePagos.moneda = this.simulatorForm.get('moneda')?.value;
    this.planDePagos.importePrestamo = toNumber(this._financiamientoBancario.toFixed(2));
    this.planDePagos.bonoBuenPagador = toNumber(this.simulatorForm.get('bono_buen_pagador')?.value.toFixed(2));
    this.planDePagos.plazoPago = this._plazoPago;
    this.planDePagos.porcSeguroDesgravamen = this._seguroDesgravamenPorcentaje;
    this.planDePagos.porcSeguroVivienda = this._seguroViviendaPorcentaje;
    this.planDePagos.cuotaInicial = toNumber(this.simulatorForm.get('cuota_inicial')?.value.toFixed(2));
    this.planDePagos.tcea = toNumber(this._TCEA.toFixed(2));
    this.planDePagos.van = toNumber(this._VAN.toFixed(2)); //Cambiar
    this.planDePagos.valorVivienda =
      this.simulatorForm.get('precio_vivienda')?.value;

    for (let i = 1; i <= this._plazoPago; i++) {
      let _cuota = toNumber(this._cuotaFinalEstandarizada.toFixed(2));
      if (i <= this._periodoGracia) {
        _cuota = 0;
      }
      let nuevaCuota: Cuota = {
        position: i,
        saldo: toNumber(this._listSaldoInicialPeriodo[i].toFixed(2)),
        capital: toNumber(this._listAmortizacionPeriodo[i].toFixed(2)),
        interes: toNumber(this._listInteresPeriodo[i].toFixed(2)),
        segDesgravamen: toNumber(this._listSeguroDesgravamen[i].toFixed(2)),
        segVivienda: toNumber(this._seguroVivienda.toFixed(2)),
        cuota: _cuota,
      };
      this.planDePagos.planDePagos.push(nuevaCuota);
    }
  }

  changeSelectedBank() {
    this.simulatorForm.controls['seguro_desgravamen_mensual'].setValue(
      this.simulatorForm.controls['seguros_banco'].value.seguroDesgravamen
    );
    this.simulatorForm.controls['seguro_inmueble_anual'].setValue(
      this.simulatorForm.controls['seguros_banco'].value.seguroInmueble
    );
  }

  //verficiar si un dato del formulario ha sido cambiado
  isChanged(element: string) {
    return this.simulatorForm.get(element)?.dirty;
  }

  cuotaCalculadaFalse() {
    //this.cuotaCalculada = false;
    console.log(this.cuotaCalculada);
  }
}

export interface SeguroBancos {
  id: number;
  nombre: string;
  seguroDesgravamen: number;
  seguroInmueble: number;
}
