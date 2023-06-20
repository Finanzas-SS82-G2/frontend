import { Component, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Consultation } from 'src/app/consultation/model/consultation';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { PlanDePagos } from 'src/app/models/plan-de-pagos';
import {ServiceConsultationService} from "../../consultation/service/service-consultation.service";
import {toInteger} from "lodash";

@Component({
  selector: 'app-dialog-plan-de-pagos',
  templateUrl: './dialog-plan-de-pagos.component.html',
  styleUrls: ['./dialog-plan-de-pagos.component.css'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
})
export class DialogPlanDePagosComponent implements AfterViewInit {
  displayedColumns: string[] = ['position', 'saldo', 'capital', 'interes', 'segDesgravamen', 'segVivienda', 'cuota'];

  dataSource = new MatTableDataSource<PlanDePagos>();

  tempConsultation: Consultation;


  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  constructor(private service: ServiceConsultationService, private http: HttpClient, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.dataSource.data = data.planDePagos.planDePagos;
    this.tempConsultation = {} as Consultation;
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
  saveData(){
    console.log("saveClick");
    let userID = localStorage.getItem("id");
    this.service.postConsultation(this.tempConsultation, toInteger(userID)).subscribe((data) => {
      this.tempConsultation = data;
    }
    );
  }

  verifyMoney(){
    if (this.data.planDePagos.moneda == 'Soles'){
      return 'S/. ';
    }
    else{
      return '$/. ';
    }
  }
}
