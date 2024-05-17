import {MatIconModule} from '@angular/material/icon'
import { AfterViewInit,Component, ViewChild } from '@angular/core';
import { MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormclientComponent } from '../form/client/formclient.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const GET_CLIENT = gql`
query{
  getclient{
    id_cli
    nom_cli
    design_types
    nif
    stat
    ville
    contact
    fonction_cont
    tel
    email
    }
    }

`;
const GET_RESERVATION = gql `
query{
  getreservation{
    id_res
    nom_cli
    libelle
    design_user
    date_res
    debut_date
    fin_date
    nb_jour
  }
}

`;

@Component({
  selector: 'app-contenu1',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,MatIconModule,FormclientComponent,CommonModule, MatFormFieldModule,MatInputModule],
  template: `
  <div>
  <mat-form-field>

<input matInput (keyup)="applyFilter($event)" placeholder="search" #input>
</mat-form-field>
    <table mat-table [dataSource]="dataSource">
  <ng-container matColumnDef="id">
    <th mat-header-cell *matHeaderCellDef> id </th>
    <td mat-cell *matCellDef="let element"> {{element.id_cli}} </td>
  </ng-container>

  <ng-container matColumnDef="types_cli">
    <th mat-header-cell *matHeaderCellDef> Types </th>
    <td mat-cell *matCellDef="let element"> {{element.design_types}} </td>
  </ng-container>

<ng-container matColumnDef="designe">
    <th mat-header-cell *matHeaderCellDef> designe </th>
    <td mat-cell *matCellDef="let element"> {{element.nom_cli}} </td>
  </ng-container>

  <ng-container matColumnDef="nif">
    <th mat-header-cell *matHeaderCellDef> nif </th>
    <td mat-cell *matCellDef="let element"> {{element.nif}} </td>
  </ng-container>

  <ng-container matColumnDef="stat">
    <th mat-header-cell *matHeaderCellDef>stat</th>
    <td mat-cell *matCellDef="let element">
    {{element.stat}}
    </td>
  </ng-container>

  <ng-container matColumnDef="contact">
    <th mat-header-cell *matHeaderCellDef>contact</th>
    <td mat-cell *matCellDef="let element">
    {{element.contact}}
    </td>
  </ng-container>
  <ng-container matColumnDef="fonction">
    <th mat-header-cell *matHeaderCellDef>fonction</th>
    <td mat-cell *matCellDef="let element">
    {{element.fonction_cont}}
    </td>
  </ng-container>

  <ng-container matColumnDef="ville">
    <th mat-header-cell *matHeaderCellDef>ville</th>
    <td mat-cell *matCellDef="let element">
    {{element.ville}}
    </td>
  </ng-container>
  <ng-container matColumnDef="tel">
    <th mat-header-cell *matHeaderCellDef>tel</th>
    <td mat-cell *matCellDef="let element">
    {{element.tel}}
    </td>
  </ng-container>

  <ng-container matColumnDef="email">
    <th mat-header-cell *matHeaderCellDef>email</th>
    <td mat-cell *matCellDef="let element">
    {{element.email}}
    </td>
  </ng-container>


  <ng-container matColumnDef="update">
      <th mat-header-cell *matHeaderCellDef> Update </th>
      <td mat-cell *matCellDef="let element">
        <button mat-icon-button color="accent" (click)="redirectToUpdate(element.id)">
             update
        </button>
      </td>
    </ng-container>


      <ng-container matColumnDef="Ajout">
        <th mat-header-cell *matHeaderCellDef>
        <button (click)="openModal()">Ajout</button>
     </th>
     <td mat-cell *matCellDef="let element"></td>
      </ng-container>

  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
  <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
</table>
<mat-paginator
    showFirstLastButtons
    aria-label="Select page of periodic elements">
  </mat-paginator>
</div>
<app-formclient *ngIf="showModal" (closeModal)="closeModal()"></app-formclient>

  `,
  styles: [`table {
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    min-width: 900px;
}
th.mat-header-cell {
    text-align: left;
    max-width: 300px;
}

button {
      border-radius: 5px; /* Rounded corners */
      background-color: blue; /* Blue background color */
      color: white; /* White text color */
      border: none; /* No border */
    }

     /* Hover effect */
     button:hover {
      background-color: darkblue; /* Darker blue on hover */
    }`]
})
export class Contenu1Component  implements AfterViewInit  {
  displayedColumns: string[] = [ 'id','types_cli' ,'designe', 'nif', 'stat', 'contact', 'fonction','ville','tel','email','update','Ajout'];
  dataSource = new MatTableDataSource<PeriodicElement>();
  showModal: boolean = false;
  error: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private apollo: Apollo) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    this.apollo
      .watchQuery({
        query:GET_CLIENT,
      })
      .valueChanges.subscribe(({ data, error }: any) => {
        this.dataSource.data = data.getclient; // Corrected property name
        this.error = error;
        console.log("Donne client ",this.dataSource.data);
      });

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  redirectToUpdate(id: string) {
    // Implement update logic here
  }

  redirectToDelete(id: string) {
    // Implement delete logic here
  }


}

export interface PeriodicElement {
  id_cli: number;
  design_types:string;
  nom_cli: string;
  nif:number;
  stat:number;
  contact:string;
  fonction_cont:string;
  ville:string;
  tel:number;
  email:string

}




