import { Component , Output, EventEmitter, OnInit}  from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { FormreservationComponent } from '../reservation/formreservation.component';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const GET_types = gql`
query{
gettypes_client{
id_types_cli
design_types
}
}
`;







const ADD_CLI = gql`
mutation($id_types_cli:Int,$nom_cli:String !,$nif:Int!,$stat:Int!,$contact:String!,$fonction_cont:String!,$ville:String!,$tel:Int!,$email:String!){
 insertclient(addclientInput:{id_types_cli:$id_types_cli,nom_cli:$nom_cli,nif:$nif,stat:$stat,contact:$contact,fonction_cont:$fonction_cont,ville:$ville,tel:$tel,email:$email}) {

  id_types_cli
  nom_cli
  nif
  stat
  contact
  fonction_cont
  ville
  tel
  email
}
}
`;
@Component({
  selector: 'app-formclient',
  standalone: true,
  imports: [ FormreservationComponent ,CommonModule,MatSelectModule,MatInputModule,MatFormFieldModule,FormsModule ],
  template: `
  <div class="modal-overlay">
      <div class="modal">

      <form class="example-form">

  <table class="example-full-width" cellspacing="0"><tr>
  <td>  <label for="nom_cli"> Nom</label>
        <input id="nom_cli" type="text"  [(ngModel)]="newcli.nom_cli" name="nom_client"></td>
    <td><label for="nif"> Nif</label>
        <input id="nif" type="number" name="nif" [(ngModel)]="newcli.nif"> </td>
    <td><label for="stat"> Stat</label>
        <input id="stat" type="number" name="stat" [(ngModel)]="newcli.stat" ></td>
    <td> <label for="contact">Contact</label>
        <input id="contact" type="text" name="contact" [(ngModel)]="newcli.contact" ></td>
  </tr></table>

  <p>

  </p>

  <table class="example-full-width" cellspacing="0"><tr>

    <td><label for="fonction_cont"> fonction contact</label>
        <input id="fonction_cont" type="text"  [(ngModel)]="newcli.fonction_contact" name="fonction_cont"></td>
    <td><label for="ville">Ville</label>
        <input id="ville" type="text" [(ngModel)]="newcli.ville" name="ville"></td>
    <td><label for="tel"> Tel</label>
        <input id="tel" type="number" [(ngModel)]="newcli.tel" name="tel"></td>
        <td><label for="email">Email</label>
        <input id="email" type="email"  [(ngModel)]="newcli.email"  name="email"></td>

  </tr>
<tr> <td>
  <div *ngIf="type">
  <label for="id_types_cli"> Type client</label>
  <select  id="id_types_cli"  [(ngModel)]="newcli.id_types_cli" name="id_types_cli"  required>

  <option *ngFor="let user of type" [value]="user.id_types_cli" >{{ user.design_types }}</option>
      </select> </div></td> </tr>

</table>
</form>
<tr>
<td>
<button class="btn-close" (click)="close1()">Fermer</button>
</td>
<td>
    <button class="btn-next" (click)="openModal()">Suivant</button>
    </td>
    </tr>
       </div>
    </div>
<app-formreservation  *ngIf="showModal" (closeModal)="closeModalA()" >  </app-formreservation>
  `,
  styles: [`
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



  `]
})
export class FormclientComponent implements OnInit{
  type: any[] = [];
  @Output() closeModal = new EventEmitter<void>();

  newcli: { id_types_cli: number; nom_cli: string,nif:number,stat:number,contact:string,fonction_contact:string,ville:string,tel:number,email:string} = { id_types_cli: 0, nom_cli:'',nif:0,stat:0,contact:'',fonction_contact:'',ville:'',tel:0,email:''};
  constructor(private apollo: Apollo) {}
  close1() {
    this.closeModal.emit();
this.openModal()
  }
  onSubmit() {
    const id_types_cli_number = Number(this.newcli.id_types_cli);
    this.apollo
      .mutate({
        mutation: ADD_CLI,
        variables: {
          id_types_cli: id_types_cli_number,
          nom_cli: this.newcli.nom_cli,
          nif: this.newcli.nif,
          stat: this.newcli.stat,
          contact: this.newcli.contact,
          fonction_cont: this.newcli.fonction_contact, // Assurez-vous que cette variable est correctement transmise
          ville: this.newcli.ville, // Assurez-vous que cette variable est correctement transmise
          tel: this.newcli.tel, // Assurez-vous que cette variable est correctement transmise
          email: this.newcli.email,
        },
      })
     .subscribe(() => {
          // Traitez la réponse de la mutation ici

          this.newcli = { id_types_cli: 0, nom_cli: '', nif: 0, stat: 0, contact: '', fonction_contact: '', ville: '', tel: 0, email: ''}; // Effacez les champs du formulaire
        },
        (error) => {
          // Gérez l'erreur ici
          console.error('Erreur lors de la mutation :', error);
        }
      );
      this.openModal()
  }


 /* onSubmit() {
    const id_types_cli_number = Number(this.newcli.id_types_cli);
    this.apollo
      .mutate({
        mutation: ADD_CLI,
        variables: {
          id_types_cli: id_types_cli_number,
           nom_cli:this.newcli.nom_cli,
           nif:this.newcli.nif,
           stat:this.newcli.stat,
           contact:this.newcli.contact,
           fonction_contact:this.newcli.fonction_contact,
           ville:this.newcli.ville,
           tel:this.newcli.tel,
           email:this.newcli.email

        },
      })
      .subscribe(() => {
        // Re-fetch users after successful insertion
        this.newcli = { id_types_cli: 0, nom_cli:'',nif:0,stat:0,contact:'',fonction_contact:'',ville:'',tel:0,email:''}; // Clear form fields
      });
    /*  this.close1()*/
   /* this.openModal()
  }*/

  ngOnInit(): void {

    this.apollo
    .watchQuery({
      query:GET_types,
    })
    .valueChanges.subscribe(({ data, error }: any) => {
      this.type = data.gettypes_client;

console.log("donnne type",data.gettypes_client)

    });

  }

  showModal: boolean = false;

  openModal() {
    this.showModal = true;


  }

  closeModalA() {
    this.showModal = false;
  }



}
