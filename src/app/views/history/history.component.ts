import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogPlanDePagosComponent } from 'src/app/views/dialog-plan-de-pagos/dialog-plan-de-pagos.component';
import { SelectionModel} from '@angular/cdk/collections';
import { MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],

})
export class HistoryComponent {

  displayedColumns: string[] = ['select', 'position', 'name', 'date', 'button'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  hidden = false;
  i = 0;
  public accepted = true;
  clientnotifications: any;
  unreadnoti: any;
  pendingcontrats: any;
  user_id: any;

  selectedElements: number = 0;
  showDialog: boolean = false;

  ngOnInit(): void {
    this.user_id = localStorage.getItem('currentUser')
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
  checkboxLabel(row?: PeriodicElement): string {
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

  showPlanDePagos() {
    this.dialog.open(DialogPlanDePagosComponent, {
      data: { message: 'Plan de Pagos' },
    });
  }

  selectElement() {
    this.showDialog = false;
    if(this.selectedElements == 0 || this.selectedElements == 1) {
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
    if (this.selection.selected.length > 0) {
      console.log('Se han seleccionado filas.');
      const selectedRows = this.selection.selected;
      console.log('Filas seleccionadas:', selectedRows);
    } else {
      console.log('No se han seleccionado filas.');
    }
  }

  showDetails(element: any) {
    console.log(element);
  }

  onRowClick(event: MouseEvent){
    event.stopPropagation();
  }
  
  constructor(public dialog: MatDialog) { }
}

export interface PeriodicElement {
  position: number;
  name: string;
  date: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Plan de pagos 1', date: "22/06/23" },
  {position: 2, name: 'Plan de pagos 2', date: "23/06/23" },
  {position: 3, name: 'Plan de pagos 3', date: "30/06/23" },
  {position: 4, name: 'Plan de pagos 4', date: "01/07/23" },
  {position: 5, name: 'Plan de pagos 5', date: "13/07/23" }
];
