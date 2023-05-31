import { Component } from '@angular/core';

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
}
