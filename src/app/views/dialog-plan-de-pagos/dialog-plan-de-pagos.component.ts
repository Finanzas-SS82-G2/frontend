import { Component, AfterViewInit, ViewChild, Inject } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { PlanDePagos } from 'src/app/models/plan-de-pagos';


@Component({
  selector: 'app-dialog-plan-de-pagos',
  templateUrl: './dialog-plan-de-pagos.component.html',
  styleUrls: ['./dialog-plan-de-pagos.component.css'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
})
export class DialogPlanDePagosComponent implements AfterViewInit {
  displayedColumns: string[] = ['position', 'saldo', 'capital', 'interes', 'segDesgravamen', 'cuota'];

  dataSource = new MatTableDataSource<PlanDePagos>();
  dataPrueba = {
    nombre: 'Juan',
    apellido: 'Perez',
    moneda: 'SOLES',

    importePrestamo: 1000,
    bonoBuenPagador: 100,
    plazoPago: 100,
    seguroDesgravamen: 0.11,
    seguroVivienda: 0.11,
    cuotaInicial: 100

  }

  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  constructor(private http: HttpClient, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.dataSource.data = data.planDePagos.planDePagos;
  }

  ngOnInit() {
    //this.getPlanDePagos();
       
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getPlanDePagos() {
    const apiUrl = 'https://api.example.com/periodic-elements'; // Reemplaza con la URL de tu RESTful API
    this.http.get<PlanDePagos[]>(apiUrl).subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  verifyMoney(){
    if (this.data.planDePagos.moneda == 'soles'){
      return 'S/. ';
    }
    else{
      return '$/. ';
    }
  }
}

/*
export interface PeriodicElement {
  position: number;
  saldo: number;
  capital: number;
  interes: number;
  segDesgravamen: number;
  cuota: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, saldo: 4648.12, capital: 351.88, interes: 144.73, segDesgravamen: 3.36, cuota: 499.97},
  {position: 2, saldo: 4281.33, capital: 366.80, interes: 130.15, segDesgravamen: 3.02, cuota: 499.97},
  {position: 3, saldo: 3908.17, capital: 373.16, interes: 123.93, segDesgravamen: 2.88, cuota: 499.97},
  {position: 4, saldo: 3520.17, capital: 388.00, interes: 109.43, segDesgravamen: 2.54, cuota: 499.97},
  {position: 5, saldo: 3124.47, capital: 395.71, interes: 101.90, segDesgravamen: 2.36, cuota: 499.97},
  {position: 6, saldo: 2720.07, capital: 404.40, interes: 93.40 , segDesgravamen: 2.17, cuota: 499.97},
  {position: 7, saldo: 2295.40, capital: 424.67, interes: 73.59 , segDesgravamen: 1.71, cuota: 499.97},
  {position: 8, saldo: 1863.41, capital: 431.99, interes: 66.44 , segDesgravamen: 1.54, cuota: 499.97},
  {position: 9, saldo: 1418.64, capital: 444.78, interes: 53.94 , segDesgravamen: 1.25, cuota: 499.97},
  {position: 10, saldo: 959.31, capital: 459.33, interes: 39.72 , segDesgravamen: 0.92, cuota: 499.97},
  {position: 11, saldo: 487.75, capital: 471.56, interes: 27.77 , segDesgravamen: 0.64, cuota: 499.97},
  {position: 12, saldo: 0.00,   capital: 487.72, interes: 11.91 , segDesgravamen: 0.30, cuota: 499.97}
];
*/