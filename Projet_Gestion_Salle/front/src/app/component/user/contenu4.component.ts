import {MatIconModule} from '@angular/material/icon'
import { AfterViewInit,Component, ViewChild } from '@angular/core';
import { MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { FormuserComponent } from '../form/user/formuser.component';

const GET_USER = gql`
 query{
  getuser{
    id_user
    design_user
    id_role
  }
}
`;
@Component({
  selector: 'app-contenu4',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,MatIconModule,CommonModule,FormuserComponent,MatFormFieldModule,MatInputModule],
  template: `

<div>
<mat-form-field>

  <input matInput (keyup)="applyFilter($event)" placeholder="search" #input>
</mat-form-field>
   <table mat-table [dataSource]="dataSource">
  <ng-container matColumnDef="id">
    <th mat-header-cell *matHeaderCellDef> id </th>
    <td mat-cell *matCellDef="let element"> {{element.id_user}} </td>
  </ng-container>

  <ng-container matColumnDef="designe">
    <th mat-header-cell *matHeaderCellDef> designe </th>
    <td mat-cell *matCellDef="let element"> {{element.design_user}} </td>
  </ng-container>

  <ng-container matColumnDef="role">
    <th mat-header-cell *matHeaderCellDef> role </th>
    <td mat-cell *matCellDef="let element"> {{element.id_role}} </td>
  </ng-container>

    <ng-container matColumnDef="delete">
        <th mat-header-cell *matHeaderCellDef> Delete </th>
        <td mat-cell *matCellDef="let element">
          <button mat-icon-button color="warn" (click)="redirectToDelete(element.id)">
              delete
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

<app-formuser *ngIf="showModal" (closeModal)="closeModal()"></app-formuser>
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
export class Contenu4Component   implements AfterViewInit  {
  displayedColumns: string[] = ['id', 'designe', 'role', 'delete', 'Ajout'];
  dataSource = new MatTableDataSource<PeriodicElement>();
  showModal: boolean = false;
  error: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private apollo: Apollo) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    this.apollo
      .watchQuery({
        query: GET_USER,
      })
      .valueChanges.subscribe(({ data, error }: any) => {
        this.dataSource.data = data.getsalle; // Corrected property name
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
  id_user: number;
  design_user: string;
  id_role: string;

}

