import { Component , Output, EventEmitter , OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { CalendarModule } from '@syncfusion/ej2-angular-calendars';
import { NgIf } from '@angular/common';
import gql from 'graphql-tag';
import {MatIconModule} from '@angular/material/icon'


const ADD_RES = gql`
  mutation insertreservation(
    $id_cli: ID!,
    $id_salle: ID!,
    $id_user: ID!,
    $prix_jour: Int!,
    $date_res: String!,
    $debut_date: String!,
    $fin_date: String!
  ) {
    insertreservation(
      addreservationInput: {
        id_cli: $id_cli,
        id_salle: $id_salle,
        id_user: $id_user,
        prix_jour: $prix_jour,
        date_res: $date_res,
        debut_date: $debut_date,
        fin_date: $fin_date
      }
    ) {
      id_cli
      id_salle
      id_user
      date_res
      debut_date
      fin_date

    }
  }
`;


/*const ADD_RES = gql`
mutation($id_cli:ID!,$id_salle:ID!,$id_user:ID!,$prix_jour:Int!,$date_res:String!,$debut_date:String!,$fin_date:String!){
  insertreservation(addreservationInput:{id_cli:$id_cli,id_salle:$id_salle,id_user:$id_user,prix_jour:$prix_jour,date_res:$date_res,debut_date:$debut_date,fin_date:$fin_date}){
   id_res

  }
}
`;*/
const GET_cli = gql`
query{
 getclient{
  id_cli
  nom_cli
}

}
`;

const GET_user = gql`
query{
  getuser{
    id_user
    design_user
  }
}
`;

const GET_P = gql`
query{
  getsalle1{
    id_salle
    libelle
    prix_jour
  }
}
`;


const GET_SALL = gql`
query{
  getsalle{
    id_salle
    libelle
    prix_jour
  }
}
`;
const GET_DATE = gql`
query{
  getDate{
    debut_date
    fin_date
  }
}
`;



@Component({
  selector: 'app-formreservation',
  standalone: true,
  imports: [CommonModule, FormsModule,CalendarModule,NgIf,MatIconModule ],
  template: `

<div class="modal-overlay">
<div class="modal">
<form class="example-form">

<table class="example-full-width" cellspacing="0"><tr>
<td>
<div *ngIf="client">
<label for="id_cli">client</label>
<select id="id_cli"   [(ngModel)]="newres.id_cli" name="id_cli">
<option *ngFor="let user of client" [value]="user.id_cli">{{ user.nom_cli }}</option>
</select>
</div>
</td>

<td>
<div *ngIf="salle">
      <label for="id_salle"> salle</label>
      <select id="id_salle" [(ngModel)]="newres.id_Salle"  name="id_salle"  >
        <option  *ngFor="let user of salle" [value]="user.id_salle">{{ user.libelle  }}</option>
      </select>
      </div>
</td>

<td>
<div *ngIf="prix">
      <label for="prix_jour"> prix salle</label>
      <select id="prix_jour" [(ngModel)]="newres.prix_jour"  name="prix_jour" >
        <option  *ngFor="let user of prix" [value]="user.prix_jour">{{ user.libelle  }}</option>
      </select>
      </div>
</td>
<td>
<div *ngIf="users">
      <label for="id_user">user</label>
      <select id="id_user"   name="id_user"  >
        <option  *ngFor="let user of users" [value]="user.id_user">{{ user.design_user}}</option>
      </select>
      </div>
</td>
<td>

<button class="btn-close" (click)="togelDialog()">Debut <mat-icon>calendar_today</mat-icon></button>
</td>
<td>

<button class="btn-next" (click)="togelDialog()" >Fin <mat-icon>calendar_today</mat-icon></button>
</td>

</tr></table>

<p>

</p>

<table class="example-full-width" cellspacing="0"><tr>

 </tr>

</table>

</form>
<tr>
<td>
<button class="btn-close" (click)="close()">Fermer</button>
</td>
<td>
<button class="btn-next" (click)="onSubmit()" >Enregistre</button>
</td>
</tr>

</div>
</div>
<div class="modal1">
<dialog [open]="showDialog">
<div class="df">


  <ejs-calendar [value]='dateValue'
  (renderDayCell)="disabledDate($event)"(change)="onDateChange($event)"  ></ejs-calendar>
  </div>
</dialog>
<dialog [open]="showDialog1">
<div class="df">


  <ejs-calendar [value]='dateValue'
  (renderDayCell)="disabledDate($event)"(change)="onDateChange1($event)"  ></ejs-calendar>
  </div>
</dialog>

</div>

  `,
  styles: [`
.modal-overlay {
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: rgba(0, 0, 0, 0.5);
display: flex;
justify-content: center;
align-items: center;
}
.modal {
background-color: #fff;
padding: 20px;
border-radius: 5px;
box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
}

.example-form {
  min-width: 150px;
  max-width: 800px; /* Augmenté la largeur maximale du formulaire */
  width: 100%;
}

.example-full-width {
  width: 100%;
}

td {
  padding-right: 8px;
  padding-bottom: 10px; /* Ajout de marge en bas pour l'espacement vertical */
}

label {
  font-weight: bold; /* Rendre les labels en gras pour les distinguer */
}

input[type='text'],
input[type='number'],
input[type='email'],
input[type='datetime-local'],
select {
  width: 100%;
  padding: 8px; /* Ajout de remplissage pour les éléments de formulaire */
  margin-bottom: 10px; /* Espacement entre les éléments de formulaire */
  border-radius: 4px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

button {
  margin-top: 10px; /* Espacement entre les boutons et les autres éléments */
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
}

.btn-close {
  background-color: #ff5555; /* Couleur de fond du bouton Fermer */
  color: white;
  margin-bottom: 10px;
}

.btn-next {
  background-color: #4caf50; /* Couleur de fond du bouton Suivant */
  color: white;
  margin-bottom: 10px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background-color: #fff;
  padding: 30px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  width: 800px;
  max-height: 500px; /* Limiter la hauteur maximale du modal */
  overflow-y: auto; /* Ajouter une barre de défilement si nécessaire */
}

.blue-button {
  background-color: blue;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
}

dialog{
position:sticky;
padding: 30px;
border-radius: 5px;

padding:10px;
top:0;
width:250px;
height:260px;

max-height: 600px; /* Limiter la hauteur maximale du modal */
overflow-y: auto; /* Ajouter une barre de défilement si nécessaire */
}
modal1 {
  background-color: #fff;
  padding: 30px;
  border-radius: 5px;
  width: 800px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);

  max-height: 600px; /* Limiter la hauteur maximale du modal */
  overflow-y: auto; /* Ajouter une barre de défilement si nécessaire */
}

/* Styles pour le calendrier */
.e-calendar .e-content {
  background-color: #f0f0f0; /* Couleur de fond du calendrier */
}

.e-calendar .e-header {
  background-color: #333; /* Couleur de fond de l'en-tête */
  color: #fff; /* Couleur du texte de l'en-tête */
}

.e-calendar .e-content .e-day.e-selected {
  background-color: #009688; /* Couleur de fond de la date sélectionnée */
  color: #fff; /* Couleur du texte de la date sélectionnée */
}

/* Styles pour la date sélectionnée */
.selected-date {
  margin-top: 10px;
  font-weight: bold;
}

df{
width: 400px;
height: 400px;


}
ejs-calendar{
  width: 500px;
  height: 260px;
  position:absolute;
}



  `]
})
export class FormreservationComponent implements OnInit{
    showDialog = false;
    showDialog1 = false;
  @Output() closeModal = new EventEmitter<void>();
  constructor(private apollo: Apollo) {}

  users: any[] = [];
  salle: any[] = [];
  prix: any[] = [];
  client: any[] = [];
  Date1: any []= [];
  Date2:any []=[];
  error: any;
  public dateValue: Date[] = [
    new Date('2024-04-07'), // Exemple de date 1
     new Date('2024-04-21'), // Exemple de date 2
     new Date('2024-04-15'),
     new Date('2024-04-19'),
     new Date('2024-04-25'),// Exemple de date 3
     // Ajoutez autant de dates que vous le souhaitez
   ];
  newres: { id_cli:number; id_Salle:number,id_user:number,prix_jour:number,date_res:string,debut_date:string,fin_date:string,} = { id_cli: 0,id_Salle:0,id_user:2,prix_jour:0,date_res:'',debut_date:'',fin_date:''};


  onSubmit(){
    console.log(this.newres)
    const id_cli = Number(this.newres.id_cli);
    const id_salle = Number(this.newres.id_Salle);
    const id_user = Number(this.newres.id_user);
    const prix = Number(this.newres.prix_jour);
  /*  this.apollo
      .mutate({
        mutation: ADD_RES,
        variables: {
          id_cli: id_cli,
          id_salle:id_salle,
          id_user: id_user,
          prix_jour:prix ,
          date_res: new Date().toISOString(),
          debut_date:this.Date2[0],
          fin_date: this.Date2[1]
        }
      })
      .subscribe(
        ({data}) => {
          console.log('Mutation successful:',data );
          // Réinitialiser le formulaire ou effectuer toute autre action nécessaire après la mutation réussie
        },
        error => {
          console.error('Erreur lors de la mutation :', error);
          // Afficher un message d'erreur à l'utilisateur ou effectuer une action appropriée en cas d'erreur
        }
      );*/
  }

  /*onSubmit() {

    const id_cli = Number(this.newres.id_cli);
    const id_salle = Number(this.newres.id_Salle);
    const id_user = Number(this.newres.id_user);
    const prix = Number(this.newres.prix_jour);
    this.apollo.mutate({
      mutation: ADD_RES,
      variables: {
        id_cli: id_cli,
        id_salle:id_salle,
        id_user: id_user,
        prix_jour: prix,
        date_res: new Date().toISOString(),
        debut_date: this.selectedDateD,
        fin_date:this.selectedDateF
      }
    }).subscribe(
      () => {
        console.log('Réservation ajoutée avec succès :');

      },
      error => {
        console.error('Erreur lors de la réservation :', error);
        // Gestion de l'erreur : afficher un message à l'utilisateur ou logguer l'erreur
      }
    );
    this.closeModal.emit();
  }*/


 /* onSubmit() {

    const id_cli = Number(this.newres.id_cli);
    const id_salle = Number(this.newres.id_Salle);
    const id_user = Number(this.newres.id_user);
    const prix = Number(this.newres.prix_jour);
    console.log(this.newres)
    this.apollo
      .mutate({
        mutation: ADD_RES,
        variables: {
          id_cli: id_cli,
          id_salle:id_salle,
          id_user:id_user,
          prix_jour:prix,
          date_res: new Date(),
          debut_date:this.selectedDateD,
          fin_date:this.selectedDateF
        },

      }

      )
      .subscribe(() => {
        // Re-fetch users after successful insertion

        this.newres = { id_cli: 0,id_Salle:0,id_user:0,prix_jour:0,date_res:'',debut_date:'',fin_date:'' }; // Clear form fields
      },

      (error) => {
        // Gérez l'erreur ici
        console.error('Erreur lors de la mutation :', error);
      });
      this.close()
  }
*/
  ngOnInit(): void {

    this.apollo
    .watchQuery({
      query: GET_cli,
    })
    .valueChanges.subscribe(({ data, error }: any) => {
      this.client = data.getclient;
      this.error = error;
    });

  this.apollo
    .watchQuery({
      query: GET_user,
    })
    .valueChanges.subscribe(({ data, error }: any) => {
      this.users = data.getuser;
      this.error = error;
    });
    this.apollo
    .watchQuery({
      query: GET_P,
    })
    .valueChanges.subscribe(({ data, error }: any) => {
      this.prix = data.getsalle1;
      this.error = error;
      console.log(this.salle)
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
    console.log(this.salle)
    this.apollo
    .watchQuery({
      query: GET_DATE,
    })
    .valueChanges.subscribe(({ data, error }: any) => {
      this.Date1 = data.getDate;
      this.error = error;

      for (const item  of this.Date1 ) {
        this.dateValue.push(new Date(item.debut_date))
        this.dateValue.push(new Date(item.fin_date))
      }
      console.log(this.dateValue)
    });
  }


togelDialog(){
  this.showDialog = ! this.showDialog ;
}
  close() {
    this.closeModal.emit();
  }

/* calendre */




public selectedDateD: Date | undefined;
public selectedDateF: Date | undefined;


disabledDate(args: any): void {
  // Vérifiez si la date actuelle est dans la liste des dates à désactiver
  if (this.dateValue.some(date => this.isSameDate(date, args.date))) {
    args.isDisabled = true; // Désactiver la date
    args.element.classList.add('disabled-date'); // Ajouter une classe CSS pour styliser la date désactivée
  }
}

// Fonction pour comparer si deux dates sont identiques en ignorant l'heure
private isSameDate(date1: Date, date2: Date): boolean {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
}

onDateChange(args: any): void {
  this.selectedDateD = args.value as Date;
  this.showDialog = ! this.showDialog ;
  console.log("Debut de mot",this.selectedDateD)
  this.Date2.push(this.selectedDateD)
  console.log("Tableua ",this.Date2)
  console.log("tableau1",this.Date2[0])
  console.log("tableau2",this.Date2[1])
}

onDateChange1(args: any): void {
  this.selectedDateF = args.value as Date;
  this.showDialog = ! this.showDialog ;
  console.log( "Fin de mont ",this.selectedDateF)
}

}



/* this.apollo
      .watchQuery({
        query: GET_cli,GET_user,GET_SALL,

      })
      .valueChanges.subscribe(({ data, error }: any) => {
        this.users = data.getuser;
        this.salle= data.getsalle;
        this.client= data.getclient;
        this.error = error ;

      });*/


      /*

      <div *ngIf="salle">
<label for="id_salle"> Salle</label>
<select formControlName="id_salle">
<option *ngFor="let user of salle" [value]="user.id_salle">{{ user.libelle }}</option>
</select>
</div>

      */
/*
<div *ngIf="users" >
<label for="id_user">user</label>
<select formControlName="id_user">
<option *ngFor="let user of users" [value]="user.id_user">{{ user.design_user }}</option>
</select>
</div>




<td>
<div *ngIf="users">
      <label for="etat">Type client</label>
      <select id="etat" [(ngModel)]="newres.id_cli"  name="etat"  >
        <option  *ngFor="let user of users" [value]="user.id_user">{{ user.design_user}} </option>
      </select>
      </div>
</td
*/



/*


<label for="debut_date"> debut de reservation</label>
<input type="datetime-local" id="debut_date" name="debut_date" [(ngModel)]="newres.debut_date" required >



 */


/*

<label for="fin_date">fin de reservation</label>
<input type="datetime-local" name="fin_date" [(ngModel)]="newres.fin_date" required >

*/


/*
test avant

<td>
<button class="btn-close" (click)="close()">Fermer</button>
</td>
<td>
<button class="btn-close" (click)="close()">Fermer</button>
</td>

*/


/*


<td> <label for="date_res">Reservation</label>
<input type="datetime-local" name="date_res"></td>


*/
