import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/users/model/user';
import { UserserviceService } from 'src/app/users/services/userservice.service';
import { toInteger } from 'lodash';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})

export class NavbarComponent implements OnInit{
  @Input() title: any;
  user: User;
  constructor(private service: UserserviceService, private router: Router) {
    this.user = {} as User;
  }

  ngOnInit(): void {
    this.service.getUserById(toInteger(localStorage.getItem("id"))).subscribe((data) => {
      this.user = data;
    });
  }

  close_session() {
    localStorage.removeItem("id");
    this.router.navigate(['/login']);
  }

}

