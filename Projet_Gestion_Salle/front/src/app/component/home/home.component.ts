import { Component, OnInit  } from '@angular/core';
import { Apollo} from 'apollo-angular';
import { CommonModule } from '@angular/common';
import gql from 'graphql-tag';
import { FormsModule } from '@angular/forms';
import { chartComponent } from '../dashbord/chart.component';
import { ContenuHomeComponent } from './contenu-home.component';
import { CarteComponent } from '../dashbord/carte.component';

const GET_USERS = gql`
query{
gettypes_client{
id_types_cli
design_types
}
}
`;
const GET_SALL = gql`
query{
  getsalle{
    id_salle
    libelle
  }
}
`;


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ CommonModule,FormsModule ,ContenuHomeComponent,chartComponent,CarteComponent],
  template: `

<div class="App">
<div class="AppGlass">
  <app-carte></app-carte>
<app-contenu-home></app-contenu-home>
<app-chart></app-chart>
</div>
</div>
 `,
  styles: [`

:host {
  --yellow: linear-gradient(180deg, #F8D49A -146.42%, #FAD79D -46.42%);
  --orange: #fca61f;
  --black: #242d49;
  --gray: #788097;
  --purple: linear-gradient(180deg, #BB67FF 0%, #C484F3 100%);
  --pink: #FF919D;
  --glass: rgba(255, 255, 255, 0.54);
  --boxShadow: 0px 19px 60px rgb(0 0 0 / 8%);
  --smboxShadow: -79px 51px 60px rgba(0, 0, 0, 0.08);
  --activeItem: #f799a354;
  --transparent: linear-gradient(to right, rgba(255, 0, 0, 0), rgba(0, 0, 255, 0));
  --trans: #dbdfe9af;
  --tran: #f9f9f9 ;
  --tr: #e5e8f0;
}

.App {
  margin: 0px;
  color: var(--black);
  background: linear-gradient(to right, rgba(255, 0, 0, 0), rgba(0, 0, 255, 0));
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', sans-serif;
  margin-top: 0px;
}

.AppGlass {
  padding: 0;
  display: grid;
  height: 89%;
  width: 98%;
  margin-left: 23%;
  background: var(--tr);
  border-radius: 2rem;
  gap: 16px;
  grid-template-columns: 11rem auto 20rem;
  overflow: hidden;
  -webkit-border-radius: 2rem;
  -moz-border-radius: 2rem;
  -ms-border-radius: 2rem;
  -o-border-radius: 2rem;
  border-style: double;
  border-color: var(--tr);
  border-width: 40px;
  padding: 0;
}

@media screen and (max-width: 1200px) {
  .AppGlass {
    grid-template-columns: 10% 50% auto;
    overflow-y: scroll;
  }
}

@media screen and (max-width: 768px) {
  .AppGlass {
    grid-template-columns: 1fr;
  }
}

app-chart{
width:700px;
height:100px;
 position:absolute;
top: 40%;
left: 45%;
padding-left:21%;
}
app-carte{
position:absolute;
top: 5%;
left: 25%;
}

`]
})
export default class HomeComponent implements OnInit {
  users: any[] = [];
  salle: any []=[]
  error: any;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: GET_USERS,
      })
      .valueChanges.subscribe(({ data, error }: any) => {
        this.users = data.gettypes_client;
        this.error = error;

      });

      this.apollo
      .watchQuery({
        query: GET_SALL,
      })
      .valueChanges.subscribe(({ data, error }: any) => {
        this.salle = data.getsalle;
        this.error = error;
        console.log(this.salle)
      });

  }


}


/**
 <h1>bonjour</h1>
    <div *ngIf="users">
      <label for="etat">Etat de salle</label>
      <select id="state"   name="etat"  >
        <option  *ngFor="let user of users" [value]="user.id_types_cli">{{ user.design_types }}</option>
      </select>
      </div>
 */

      /*

      <td>

</td>
</div>
<td  *ngIf="users" >

<label for="id_salle"> Salle</label>
<select formControlName="id_salle">
<option *ngFor="let user of users" [value]="user.id_types_cli">{{ user.design_types}}</option>
</select>

</td>
</tr>
</table>




      */
