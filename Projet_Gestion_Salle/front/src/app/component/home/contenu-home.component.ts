import { Component , OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Apollo, gql } from 'apollo-angular';

import { DunatComponent } from '../dashbord/dunat.component';
const GET_USERS = gql`{
 query{
  gettypes_client{
    id_types_cli
    design_types
  }
}}
`;
@Component({
  selector: 'app-contenu-home',
  standalone: true,
  imports: [CommonModule,DunatComponent],
  template: `


  <app-dunat></app-dunat>







  `,
  styles: [`
app-dunat{
width:200px;
height:200px;
position:absolute;
top: 50%;
left: 29%;
padding-right:30%;
}


  `]
})
export class ContenuHomeComponent  implements OnInit {
  users: any[] = [];


constructor(private apollo: Apollo) {}
ngOnInit() {
  this.apollo.query<any>({
    query: GET_USERS
  }).subscribe(result => {
    this.users = result.data.users;
  });


}
}

/*

<ul>
  <li *ngFor="let user of users">

    {{ user.design_types }}
  </li>
</ul>

*/
