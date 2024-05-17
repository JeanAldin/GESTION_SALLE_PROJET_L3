import { Component , Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-types-client',
  standalone: true,
  imports: [],
  template: `
     <div class="modal-overlay">
      <div class="modal">
        <h2>Modal Component</h2>
        <p>This is a modal!</p>
        <button (click)="close()">Close</button>
      </div>
    </div>
  `,
  styles:[ `.modal-overlay {
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
  }`]
})
export class TypesClientComponent {
  @Output() closeModal = new EventEmitter<void>();

  close() {
    this.closeModal.emit();
  }
}
