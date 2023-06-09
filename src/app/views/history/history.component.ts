import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogPlanDePagosComponent } from 'src/app/views/dialog-plan-de-pagos/dialog-plan-de-pagos.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  hidden = false;
  i=0;
  public accepted=true;
  clientnotifications:any;
  unreadnoti:any;
  pendingcontrats:any;
  user_id:any;
  
  ngOnInit(): void {
    this.user_id=localStorage.getItem('currentUser')
  }
  showAccept(){
    this.accepted=true;
  }
  toggleBadgeVisibility() {
    this.hidden = true;
  }

  showPlanDePagos(){
    this.dialog.open(DialogPlanDePagosComponent, {
      data: { message: 'Plan de Pagos' },
    });
  }

  constructor(public dialog: MatDialog) {}
}
