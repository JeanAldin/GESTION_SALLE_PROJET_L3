import {MatIconModule} from '@angular/material/icon'
import { AfterViewInit,Component, ViewChild,OnInit } from '@angular/core';
import { MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormreservationComponent } from '../form/reservation/formreservation.component';
import { FormclientComponent } from '../form/client/formclient.component';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { Apollo} from 'apollo-angular'
import { gql } from '@apollo/client';

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


const getuser = gql `

query{
  getuser{
    id_user
    design_user


  }
}
`;

@Component({
    selector: 'app-contenu',
    standalone: true,
    template: `

<div>
  <mat-form-field>

<input matInput (keyup)="applyFilter($event)" placeholder="search" #input>
</mat-form-field>
    <table mat-table [dataSource]="dataSource">
  <ng-container matColumnDef="id">
    <th mat-header-cell *matHeaderCellDef> id </th>
    <td mat-cell *matCellDef="let element"> {{element.id_res}} </td>
  </ng-container>

  <ng-container matColumnDef="id_cli">
    <th mat-header-cell *matHeaderCellDef> client </th>
    <td mat-cell *matCellDef="let element"> {{element.nom_cli}} </td>
  </ng-container>

<ng-container matColumnDef="id_salle">
    <th mat-header-cell *matHeaderCellDef> salle</th>
    <td mat-cell *matCellDef="let element"> {{element.libelle}} </td>
  </ng-container>

  <ng-container matColumnDef="id_user">
    <th mat-header-cell *matHeaderCellDef> user </th>
    <td mat-cell *matCellDef="let element"> {{element.design_user}} </td>
  </ng-container>

  <ng-container matColumnDef="date_res">
    <th mat-header-cell *matHeaderCellDef>date</th>
    <td mat-cell *matCellDef="let element">
    {{element.date_res}}
    </td>
  </ng-container>

  <ng-container matColumnDef="debut_date">
    <th mat-header-cell *matHeaderCellDef>debut_date</th>
    <td mat-cell *matCellDef="let element">
    {{element.debut_date}}
    </td>
  </ng-container>
  <ng-container matColumnDef="fin_date">
    <th mat-header-cell *matHeaderCellDef>fin_date</th>
    <td mat-cell *matCellDef="let element">
    {{element.fin_date}}
    </td>
  </ng-container>

  <ng-container matColumnDef="nb_jour">
    <th mat-header-cell *matHeaderCellDef>nombre jour</th>
    <td mat-cell *matCellDef="let element">
    {{element.nb_jour}}
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
    styles: [`

table {
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
    }
  `],
    imports: [FormreservationComponent, MatTableModule, MatPaginatorModule, MatIconModule, CommonModule, MatFormFieldModule, MatInputModule, FormclientComponent]
})
export class ContenuComponent implements OnInit {
  displayedColumns: string[] = [ 'id','id_cli' ,'id_salle', 'id_user', 'date_res', 'debut_date', 'fin_date','nb_jour','Ajout'];
  dataSource = new MatTableDataSource<PeriodicElement>();
  showModal: boolean = false;
  error: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private apollo: Apollo) {}


  ngOnInit(): void{
    this.dataSource.paginator = this.paginator;

    this.apollo
    .watchQuery({
      query: GET_RESERVATION,
    })
    .valueChanges.subscribe(({ data, error }: any) => {
      this.dataSource.data = data.getreservation; // Utiliser getreservation au lieu de getclient
      this.error = error;
      console.log("Donne reservation  ", this.dataSource.data)
    });

  /*  this.apollo
      .watchQuery({
        query:GET_RESERVATION,
      })
      .valueChanges.subscribe(({ data, error }: any) => {
        this.dataSource.data = data.getclient; // Corrected property name
        this.error = error;
        console.log("Donne reservation  ",this.dataSource.data)
      });
      console.log("Donne  ",this.dataSource.data)*/
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
    id_res:number;
    nom_cli: string;
    libelle: string;
    design_user: string;
    date_res:string;
    debut_date:string;
    fin_date:string;
    nb_jour:number;

}

