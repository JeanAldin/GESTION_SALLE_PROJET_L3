import { Component , Output, EventEmitter,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const ADD_USER = gql`
mutation($design_user:String !,$id_role:Int!,$mdp:String!){
  insertuser(adduserInput:{design_user:$design_user,id_role:$id_role,mdp:$mdp }){
    id_user
    design_user
    mdp
  }
}

`;
const GET_role = gql`
query{
  getrole_user{
    id_role
    design_role
  }
}
`;



@Component({
  selector: 'app-formuser',
  standalone: true,
  imports: [CommonModule,FormsModule],
  template: `
   <div class="modal-overlay">
<div class="modal">
<form class="example-form">

<table class="example-full-width" cellspacing="0"><tr>

<td><label for="design_user">design</label>
<input type="text" id="design_user" name="design_user" [(ngModel)]="newuser.design_user"   ></td>


<td>
  <div *ngIf="role" >
<label for="id_role">Role user</label>
<select id="id_role" [(ngModel)]="newuser.id_role" name="id_role" required>
<option *ngFor="let user of role" [value]="user.id_role" >{{ user.design_role }}</option>

    </select>

    </div>
</td>

<td><label for="mdp">mot de passe </label>
<input type="password" id="mdp" name="mdp" [(ngModel)]="newuser.mdp"  ></td>

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
input[type='password'],
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
export class FormuserComponent  implements OnInit{
  @Output() closeModal = new EventEmitter<void>();
  role: any[] = [];
  error: any;
  newuser: {design_user:string, id_role:number;mdp: string,} = { design_user: '',id_role:0,mdp:'' };
  constructor(private apollo: Apollo) {}
  close() {
    this.closeModal.emit();
  }

  onSubmit() {
    this.apollo
      .mutate({
        mutation: ADD_USER,
        variables: {
          design_user: this.newuser.design_user,
          id_role: this.newuser.id_role,
          mdp:this.newuser.mdp,

        },
      })
      .subscribe(() => {
        // Re-fetch users after successful insertion
        this.newuser = { design_user: '',id_role:0,mdp:'' }; // Clear form fields
      });
      this.close()
  }

  ngOnInit(): void {

    this.apollo
    .watchQuery({
      query:GET_role,
    })
    .valueChanges.subscribe(({ data, error }: any) => {
      this.role = data.getrole_user;
     this.error= error;


    });

  }


}

/*

<td>
<div *ngIf="role">
      <label for="id_role">Role </label>
      <select id="id_role"   name="id_role"  >
        <option  *ngFor="let user of role" [value]="user.id_role">{{ user.design_role}}</option>
      </select>
      </div>
</td>



*/
