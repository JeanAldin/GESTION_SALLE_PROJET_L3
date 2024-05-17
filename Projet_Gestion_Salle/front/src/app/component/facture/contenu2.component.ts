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

const GET_FACTURE = gql`
query{
  getfacture{
    id_fact
    id_fact
    montant
    date_fact
    nombre_jour
  }
}

`

@Component({
  selector: 'app-contenu2',
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
    <td mat-cell *matCellDef="let element"> {{element.id_fact}} </td>
  </ng-container>

  <ng-container matColumnDef="client">
    <th mat-header-cell *matHeaderCellDef> client </th>
    <td mat-cell *matCellDef="let element"> {{element.id_client}} </td>
  </ng-container>

  <ng-container matColumnDef="id_res">
    <th mat-header-cell *matHeaderCellDef> client </th>
    <td mat-cell *matCellDef="let element"> {{element.id_res}} </td>
  </ng-container>

<ng-container matColumnDef="date_fact">
    <th mat-header-cell *matHeaderCellDef> date de fact </th>
    <td mat-cell *matCellDef="let element"> {{element.date_fact}} </td>
  </ng-container>

  <ng-container matColumnDef="montant">
    <th mat-header-cell *matHeaderCellDef> montant </th>
    <td mat-cell *matCellDef="let element"> {{element.montant}} </td>
  </ng-container>

  <ng-container matColumnDef="nombre_jour">
    <th mat-header-cell *matHeaderCellDef>nombre de jour</th>
    <td mat-cell *matCellDef="let element">
    {{element.nombre_jour}}
    </td>
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
export class Contenu2Component  implements AfterViewInit  {
  displayedColumns: string[] = [ 'id','client' ,'id_res', 'date_fact', 'montant', 'nombre_jour','Ajout'];
  dataSource = new MatTableDataSource<PeriodicElement>();
  showModal: boolean = false;
  error: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private apollo: Apollo) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    this.apollo
      .watchQuery({
        query: GET_FACTURE,
      })
      .valueChanges.subscribe(({ data, error }: any) => {
        this.dataSource.data = data.getclient; // Corrected property name
        this.error = error;
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
  id_fact: number;
  id_cli: string;
  id_res: number;
  date_fact:string;
  montant:string;
  nombre_jour:number;

}







