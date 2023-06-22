import { Component, AfterViewInit, ViewChild, Inject, Input } from '@angular/core';
import { MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Consultation } from 'src/app/consultation/model/consultation';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { PlanDePagos } from 'src/app/models/plan-de-pagos';
import {ServiceConsultationService} from "../../consultation/service/service-consultation.service";
import {toInteger} from "lodash";
import { ServiceInputDataService } from 'src/app/inputdata/service/service-input-data.service';
import { ServicePaymentPlanService } from 'src/app/paymentPlan/services/service-payment-plan.service';
import { InputData } from 'src/app/inputdata/model/input-data';
import { PaymentPlan } from 'src/app/paymentPlan/model/payment-plan';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxValidFormComponent } from '../dialog-box-valid-form/dialog-box-valid-form.component';

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
  tempInputData: InputData;
  tempPaymentPlan: PaymentPlan;
  buttonAction: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  constructor(
    private dialog: MatDialog,
    private http: HttpClient, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.dataSource.data = data.planDePagos.planDePagos;
    this.tempConsultation = {} as Consultation;
    this.tempInputData = {} as InputData;
    this.tempPaymentPlan = {} as PaymentPlan;
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
    let userID = toInteger(localStorage.getItem("id"));
    console.log(userID);

    var req = new XMLHttpRequest();
    req.open('POST', `http://localhost:8080/api/v1/consultations/${userID}`, false);
    req.setRequestHeader('Content-Type', 'application/json');
    var requestData = {
      'id': 0,
      'user': {},
    };    

    req.send(JSON.stringify(requestData));

    if (req.status === 201) {
      console.log('La solicitud POST CONSULT fue exitosa');
      console.log(req.responseText);
      var req2 = new XMLHttpRequest();
      req2.open('GET', `http://localhost:8080/api/v1/consultations/`, false);
      req2.send(null);
      if (req2.status === 200) {
        console.log('La solicitud GET ALL CONSULTS fue exitosa');
        var consulta = JSON.parse(req2.responseText);
        console.log(consulta.length);
        var req3 = new XMLHttpRequest();
        req3.open('POST', `http://localhost:8080/api/v1/input-information/${consulta.length}`, false);
        req3.setRequestHeader('Content-Type', 'application/json');
        console.log(this.data.planDePagos);
        var requestData2 = {
          'bank': this.data.planDePagos.banco.nombre,
          'consultation': {},
          'currency': this.data.planDePagos.moneda,
          'customerFirstName': this.data.planDePagos.nombre,
          'customerLastName': this.data.planDePagos.apellido,
          'effectiveAnnualRate': this.data.planDePagos.tea,
          'goodPayerBonus': this.data.planDePagos.bonoBuenPagador,
          'gracePeriod': this.data.planDePagos.periodoGracia,
          'homeInsurance': this.data.planDePagos.porcSeguroVivienda,
          'housingPrice': this.data.planDePagos.valorVivienda,
          'id': 0,
          'initialFee': this.data.planDePagos.cuotaInicial,
          'insuranceDeduction': this.data.planDePagos.porcSeguroDesgravamen,
          'loanAmount': this.data.planDePagos.importePrestamo,
          'paymentTerm': this.data.planDePagos.plazoPago,
        };
        req3.send(JSON.stringify(requestData2));

        if (req3.status === 201) {
          console.log('La solicitud POST INPUT DATA fue exitosa');
          console.log(req3.responseText);
          var req4 = new XMLHttpRequest();
          req4.open('POST', `http://localhost:8080/api/v1/payment-plans/${consulta.length}`, false);
          req4.setRequestHeader('Content-Type', 'application/json');
          var requestData3 = {
            "consultation": {},
            "id": 0,
            "monthlyFee": this.data.planDePagos.cuotaMensual,
            "tcea": this.data.planDePagos.tcea,
            "van": this.data.planDePagos.van,
          };

          req4.send(JSON.stringify(requestData3));
          if(req4.status === 201){
            console.log('La solicitud POST PAYMENT PLAN fue exitosa');
            console.log(req4.responseText);
            this.buttonAction = true;
            this.dialog.open(DialogBoxValidFormComponent, {
              data: { message: 'Consulta Guardado Correctamente' },
            });
          }
          else {
            console.log('La solicitud POST PAYMENT PLAN no fue exitosa');
          }

        }
        else {
          console.log('La solicitud POST INPUT DATA no fue exitosa');
        }
      } else {
        console.log('Error en la solicitud GET');
      }

    } else {
      console.log('Error en la solicitud POST');
    }
  }

  verifyMoney(){
    if (this.data.planDePagos.moneda == 'Soles'){
      return 'S/. ';
    }
    else{
      return '$/. ';
    }
  }

  veryfyButtonDisabled() : boolean{
    return this.buttonAction;
  }
}
