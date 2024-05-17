import { Component , ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import { CalendarModule, DatePickerModule, TimePickerModule, DateRangePickerModule, DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import {MatIconModule} from '@angular/material/icon'

@Component({
  selector: 'app-root',
  standalone: true,

imports: [CalendarModule,DatePickerModule,RouterOutlet,RouterModule,TimePickerModule, DateRangePickerModule, DateTimePickerModule,MatIconModule],
  template: `

<div class="contain">
  <div class="navbar">
    <ul>
      <li (mouseover)="activateLink($event)">
        <a routerLink="/check">
          <span class="icon"><span><img src="assets/photo/SPATP.png" alt="logo" /></span></span>
          <span class="title"><span class="tuto">P.A.C.T</span></span>
        </a>
      </li>
      <li (mouseover)="activateLink($event)">
        <a routerLink="home">
          <span class="icon"><mat-icon> table_chart</mat-icon> </span>
          <span class="title">home</span>
        </a>
      </li>
      <!-- Ajoutez les autres liens ici -->
      <li (mouseover)="activateLink($event)">
        <a routerLink="calendre">
          <span class="icon"> <mat-icon>calendar_today</mat-icon> </span>
          <span class="title">calendre</span>
        </a>
      </li>
      <li (mouseover)="activateLink($event)">
        <a routerLink="reservation">
          <span class="icon"> <mat-icon> rate_review</mat-icon> </span>
          <span class="title">Reservation</span>
        </a>
      </li>
      <li (mouseover)="activateLink($event)">
        <a routerLink="client">
          <span class="icon"> <mat-icon>group_add</mat-icon> </span>
          <span class="title">Client</span>
        </a>
      </li>
      <li (mouseover)="activateLink($event)">
        <a routerLink="facture">
          <span class="icon"><mat-icon> rate_review</mat-icon> </span>
          <span class="title">Facture</span>
        </a>
      </li>
      <li (mouseover)="activateLink($event)">
        <a routerLink="salle">
          <span class="icon"><mat-icon> list_alt</mat-icon> </span>
          <span class="title">Salle</span>
        </a>
      </li>
      <li (mouseover)="activateLink($event)" >
        <a routerLink="test">
          <span class="icon"> <mat-icon>person</mat-icon></span>
          <span class="title">User</span>
        </a>
      </li>
      <li (mouseover)="activateLink($event)">
        <a routerLink="deconnexion">
          <span class="icon"><mat-icon>assignment_return</mat-icon></span>
          <span class="title" (click)="logout()" >Déconnexion</span>
        </a>
      </li>
    </ul>
  </div>
</div>

<router-outlet></router-outlet>

  `,
  styles: [`
*{
margin: 0;
padding: 0;
box-sizing: border-box;
}

:root{
--bleu:#2a2185;
--white:#ffff;
--nav: #1879b9;
}

.contain {
  position: relative;
  width: 100%;

}
.navbar {
  position: fixed;
  width: 300px;
  height: 100%;
  background: #2a2185 ;
  border-left: 10px solid #2a2185;
  transition: 0.5s;
  overflow: hidden;
  border-radius: 2rem;
}
.navbar ul {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
.navbar ul li {
  position: relative;
  width: 100%;
  list-style: none;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
}
.navbar ul li:hover,
.navbar ul li.hovered {
  background-color: #ffff ;
}
.navbar ul li:nth-child(1) {
  margin-top: 9px;
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 17px;
  pointer-events: none;
}
.navbar ul li a {
  position: relative;
  display: block;
  width: 100%;
  display: flex;
  text-decoration: none;
  color:#ffff  ;
}
.navbar ul li:hover a,
.navbar ul li.hovered a {
  color: #1879b9 ;
}
.navbar ul li a .icon {
  position: relative;
  display: block;
  min-width: 60px;
  height: 60px;
  line-height: 75px;
  text-align: center;
}
.navbar ul li a .icon:nth-child(1) {
  font-size: 1.90rem;
}
.navbar ul li a .title {
  position: relative;
  display: block;
  padding: 0 10px;
  height: 60px;
  line-height: 60px;
  text-align: start;
  white-space: nowrap;
}

/*----- curvi----*/
.contain ul li:hover a::before,
.contain ul li.hovered a::before {
  content: "";
  position: absolute;
  right: 0;
  top: -50px;
  width: 50px;
  height: 50px;
  background-color: transparent;
  border-radius: 50%;
  box-shadow: 35px 35px 0 10px  ;
  pointer-events: none;
}
.contain ul li:hover a::after,
.contain ul li.hovered a::after {
  content: "";
  position: absolute;
  right: 0;
  bottom: -50px;
  width: 50px;
  height: 50px;
  background-color: transparent;
  border-radius: 50%;
  box-shadow: 35px -35px 0 10px  #ffff;
  pointer-events: none;
}
img {
  width: 60px;
  height: 50px;
  margin-left: 20%;
  border-radius: 7px;
}
h1 {
  margin-top: 18px;
}
.tuto {
  margin-left: 20%;
}
  `]


})
export class AppComponent implements OnInit {
  title = 'front';

  constructor(private router: Router,private authService: AuthService) { }

  ngOnInit(): void {
   /* this.router.navigate(['/login'])*/
  }

  activateLink(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const navbarItems = document.querySelectorAll('.navbar ul li');
    navbarItems.forEach(item => {
      item.classList.remove('hovered');
    });
    target.closest('li')?.classList.add('hovered');
  }

  logout() {
    this.authService.logout();
  }
}



/*   <router-outlet></router-outlet> */
