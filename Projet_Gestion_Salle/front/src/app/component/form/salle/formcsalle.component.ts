import { Component , Output, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const ADD_SALLE = gql`
mutation($libelle:String!,$etat:String!,$prix_jour:Int){
  insertsalle(addsalleInput:{libelle:$libelle,etat:$etat,prix_jour:$prix_jour}){
    id_salle
    libelle
    prix_jour
  }
}
`;

 @Component({
  selector: 'app-formcsalle',
  standalone: true,
  imports: [CommonModule,FormsModule ],
  template: `
 <div class="modal-overlay">
<div class="modal">

<form class="example-form" (ngSubmit)="onSubmit()" #typeForm="ngForm">
          <table class="example-full-width" cellspacing="0">
            <tr>
              <td>
                <label for="libelle">Libelle</label>
                <input type="text" id="libelle" name="libelle" [(ngModel)]="newsalle.libelle" required>
              </td>
              <td>
                <label for="prix">Prix journalier</label>
                <input type="number" id="prix" name="prix" [(ngModel)]="newsalle.prix_jour" required>
              </td>
              <td>
                <label for="etat">Etat de salle</label>
                <select id="state" [(ngModel)]="newsalle.etat" name="etat" required>
                  <option value="occupe">occupe</option>
                  <option value="Non occupe">Nom occupe</option>
                </select>
              </td>
            </tr>
          </table>
          <div class="btn-container">
            <button type="button" class="btn-close" (click)="close()">Fermer</button>
            <button type="submit" class="btn-next">Enregistrer</button>
          </div>
        </form>
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




  `],
})
export class FormcsalleComponent {
 newsalle: { libelle: string; etat: string,prix_jour:Number } = { libelle: '',etat:'', prix_jour:0 };
  @Output() closeModal = new EventEmitter<void>();
  constructor(private apollo: Apollo) {}
  close() {
    this.closeModal.emit();
  }

  onSubmit() {
    this.apollo
      .mutate({
        mutation: ADD_SALLE,
        variables: {
          libelle: this.newsalle.libelle,
          etat: this.newsalle.etat,
          prix_jour:this.newsalle.prix_jour
        },
      })
      .subscribe(() => {
        // Re-fetch users after successful insertion
        this.newsalle = { libelle: '',etat:'', prix_jour:0 }; // Clear form fields
      });
      this.close()
  }



}
