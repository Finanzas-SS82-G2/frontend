import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogPlanDePagosComponent } from 'src/app/views/dialog-plan-de-pagos/dialog-plan-de-pagos.component';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Consultation } from 'src/app/consultation/model/consultation';
import { Observable, retry, catchError } from 'rxjs';
import { InputData } from 'src/app/inputdata/model/input-data';
import { PaymentPlan } from 'src/app/paymentPlan/model/payment-plan';
import { DialogHistoryDetailsComponent } from '../dialog-history-details/dialog-history-details.component';
import { DialogComparePlansComponent } from '../dialog-compare-plans/dialog-compare-plans.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],

})
export class HistoryComponent {

  hidden = false;
  i = 0;
  public accepted = true;
  clientnotifications: any;
  unreadnoti: any;
  pendingcontrats: any;
  user_id: any;
  baseUrl: string = 'https://finanzasapi.azurewebsites.net/api/v1/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  HISTORY_DATA: HistoryData[] = [];
  consultas: any[] = [];
  inputInformations: InputData[] = [];
  paymentPlans: PaymentPlan[] = [];

  displayedColumns: string[] = ['select', 'position', 'name', 'button'];
  selection = new SelectionModel<HistoryData>(true, []);
  dataSource: any;

  selectedElements: number = 0;
  showDialog: boolean = false;

  constructor(private http: HttpClient, public dialog: MatDialog) {
    this.obtenerHistoria();
    setTimeout(() => {
      
      console.log("--History data finaaaaaaaaaaal--")
      console.log(this.HISTORY_DATA)
      this.dataSource = new MatTableDataSource<HistoryData>(this.HISTORY_DATA);
      this.toggleAllRows();
      setTimeout(() => {
        this.toggleAllRows();
      }, 500);

    }, 1500);
    this.user_id = localStorage.getItem('id')
    //this.loadData();
  }
  async obtenerHistoria() {
    var newdata = new LoadData(this.http);
    try {
      this.HISTORY_DATA = await newdata.fetchHistoryData();
    } catch (error) {
      console.error(error);
    }
  }

  ngOnInit(): void {
    //this.loadData();    
  }
  getHISTORYDATA() {
    return this.HISTORY_DATA;
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: HistoryData): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  showAccept() {
    this.accepted = true;
  }
  toggleBadgeVisibility() {
    this.hidden = true;
  }

  showDialogDetails(element: any) {
    this.dialog.open(DialogHistoryDetailsComponent, {
      data: element,
    });
  }

  selectElement() {
    this.showDialog = false;
    if (this.selectedElements == 0 || this.selectedElements == 1) {
      this.selectedElements += 1;
    }
    else {
      this.selectedElements -= 1;
    }

    this.checkSelection();

  }

  checkSelection() {
    if (this.selectedElements == 2) {
      this.showDialog = true;
    }
  }

  showConsoleMessage() {
    // if (this.selection.selected.length > 0) {
    //   console.log('Se han seleccionado filas.');
    //   const selectedRows = this.selection.selected;
    //   console.log('Filas seleccionadas:', selectedRows);
    // } else {
    //   console.log('No se han seleccionado filas.');
    // }

    this.dialog.open(DialogComparePlansComponent, {
      data: this.selection.selected
    })


  }

  showDetails(element: any) {
    console.log(element);
  }

  onRowClick(event: MouseEvent) {
    event.stopPropagation();
  }

}

export interface HistoryData {
  position: number;
  consultation: Consultation;
  inputInformation: InputData;
  paymentPlan: PaymentPlan;
}

class LoadData {

  user_id = localStorage.getItem('id')
  baseUrl: string = 'https://finanzasapi.azurewebsites.net/api/v1/';
  HISTORY_DATA: HistoryData[] = [];
  consultas: any[] = [];
  inputInformations: InputData[] = [];
  paymentPlans: PaymentPlan[] = [];
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http: HttpClient) {
    this.user_id = localStorage.getItem('id')
    //this.loadData();
  }

  getConsultationByUserId(id: any): Observable<any> {
    return this.http.get(this.baseUrl + 'consultations/user/' + id)
  }
  getInputInformationByConsultationId(id: any): Observable<any> {
    return this.http.get(this.baseUrl + 'input-information/' + id)
  }
  getPaymentPlanByConsultationId(id: any): Observable<any> {
    return this.http.get(this.baseUrl + 'payment-plans/' + id)
  }
  async fetchHistoryData() {
    let count = 1;
    try {
      const consultations = await this.getConsultationByUserId(this.user_id).toPromise();
  
      for (const consultation of consultations) {
        const consultationId = consultation.id;
        const inputInformation = await this.getInputInformationByConsultationId(consultationId).toPromise();
        const paymentPlan = await this.getPaymentPlanByConsultationId(consultationId).toPromise();
  
        const historyData: HistoryData = {
          position: count++,
          consultation: consultation,
          inputInformation: inputInformation,
          paymentPlan: paymentPlan
        };
        this.HISTORY_DATA.push(historyData);
      }
      return this.HISTORY_DATA;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

}