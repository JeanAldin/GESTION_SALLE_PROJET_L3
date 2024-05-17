import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { Circ1Component } from './circular/circ1.component';
import { Circ2Component } from './circular/circ2.component';
import { Circ3Component } from './circular/circ3.component';
import {MatIconModule} from '@angular/material/icon'
@Component({
  selector: 'app-carte',
  standalone: true,
  imports: [MatCardModule,Circ1Component,Circ2Component ,Circ3Component,MatIconModule],
  template: `
  <table  class="table">
  <tr>
   <td class="card">
    <mat-card class="example-card1">
  <mat-card-header>
    <mat-card-title-group>
      <mat-card-title></mat-card-title>
      <mat-card-subtitle><app-circ1></app-circ1></mat-card-subtitle>
      <div class="icon">
      <mat-icon> list_alt</mat-icon>
      </div>
    </mat-card-title-group>
  </mat-card-header>
  <mat-card-content>
    {{longText}}
  </mat-card-content>
</mat-card>
    </td>
    <td  class="card">
    <mat-card class="example-card2">
  <mat-card-header>
    <mat-card-title-group>
      <mat-card-title></mat-card-title>
      <mat-card-subtitle><app-circ2></app-circ2></mat-card-subtitle>
      <div class="icon">
      <mat-icon>group_add</mat-icon>
      </div>
    </mat-card-title-group>
  </mat-card-header>
  <mat-card-content>
    {{longText}}
  </mat-card-content>
</mat-card>
    </td>
    <td  class="card">
    <mat-card class="example-card3">
  <mat-card-header>
    <mat-card-title-group>
      <mat-card-title></mat-card-title>
      <mat-card-subtitle><app-circ3></app-circ3></mat-card-subtitle>
      <div class="icon">
      <mat-icon> table_chart</mat-icon>
      </div>
    </mat-card-title-group>
  </mat-card-header>
  <mat-card-content>
    {{longText}}
  </mat-card-content>
</mat-card>
    </td>


   </tr>
   </table>
  `,
  styles: [`
  td{
    width:300px;
    height:10px;
  }
  .example-card1 {

  margin-bottom: 4px;
  border-radius: 10px; /* Ajustez la valeur selon votre préférence */
  background-color: #f0f0f0;
  padding: 10px;
  }
  .example-card2 {

   margin-bottom: 6px;
   border-radius: 10px; /* Ajustez la valeur selon votre préférence */
  background-color: #f0f0f0;
  padding: 10px;
 }
 .example-card3 {

   margin-bottom: 6px;
   border-radius: 10px; /* Ajustez la valeur selon votre préférence */
   background-color: #f0f0f0;
  padding: 10px;
 }

 .table {
  border-collapse: separate;
  border-spacing: 24px; /* Ajustez la valeur selon votre préférence */
}

card {
  border-radius: 10px; /* Ajustez la valeur selon votre préférence */
  background-color: #f0f0f0;
  padding: 10px;
}
mat-icon{
  width:70px;
height:70px;
}
.icon{
width:80px;
height:80px;

}
  `]
})
export class CarteComponent {
  longText = `Top : plus visite


  `;
}
