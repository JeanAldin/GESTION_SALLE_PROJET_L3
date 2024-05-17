import { Component , Output, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-modcleint',
  standalone: true,
  imports: [ CommonModule ],
  template: `
<div class="modal-overlay">
      <div class="modal">

      <form class="example-form">

  <table class="example-full-width" cellspacing="0"><tr>
  <td>  <label for="Nom"> Nom</label>
        <input type="text" name="nom_client"></td>
    <td><label for="nif"> Nif</label>
        <input type="number" name="nif"> </td>
    <td><label for="stat"> Stat</label>
        <input type="number" name="stat"></td>
    <td> <label for="contact">Contact</label>
        <input type="text" name="contact"></td>
  </tr></table>

  <p>

  </p>

  <table class="example-full-width" cellspacing="0"><tr>

    <td><label for="fonction_cont"> fonction contact</label>
        <input type="text" name=" fonction_cont"></td>
    <td><label for="ville">Ville</label>
        <input type="text" name="ville"></td>
    <td><label for="tel"> Tel</label>
        <input type="number" name="tel"></td>
        <td><label for="email">Email</label>
        <input type="email" name="email"></td>

  </tr>
<tr> <td>
  <label for="Type"> Type client</label>
  <select formControlName="state">
        <option >
          ffgghhhjjfgg
        </option>
      </select></td> </tr>

</table>
</form>
<tr>
<td>
<button class="btn-close "  >Fermer</button>
</td>
<td>
    <button class="btn-next" >Suivant</button>
    </td>
    </tr>
       </div>
    </div>

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
export class ModcleintComponent {

  @Output() closeModal = new EventEmitter<void>();

  close() {
    this.closeModal.emit();
  }


}
