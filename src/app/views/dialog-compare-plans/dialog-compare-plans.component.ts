import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-compare-plans',
  templateUrl: './dialog-compare-plans.component.html',
  styleUrls: ['./dialog-compare-plans.component.css']
})
export class DialogComparePlansComponent {
  dataSource: any;

  constructor(
    private dialog: MatDialog,
    private http: HttpClient, 
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.dataSource = data;
      console.log("data source")
      console.log(this.dataSource)
    }
}
