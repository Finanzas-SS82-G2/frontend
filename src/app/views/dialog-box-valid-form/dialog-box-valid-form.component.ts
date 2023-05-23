import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-box-valid-form',
  templateUrl: './dialog-box-valid-form.component.html',
  styleUrls: ['./dialog-box-valid-form.component.css']
})
export class DialogBoxValidFormComponent implements OnInit{
  constructor(public dialogRef: MatDialogRef<DialogBoxValidFormComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
