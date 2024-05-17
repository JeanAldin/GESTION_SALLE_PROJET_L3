import { Component } from '@angular/core';
import { ContenuComponent } from './contenu.component';
@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [ContenuComponent],
  template: `
     <div class="App3">
  <div class="AppGlass3">
    <app-contenu />
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

  .App3 {
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

  .AppGlass3 {
    padding: 0;
   /*  display: flex; Ajout de display: flex; */
   /*  align-items: center; Centrer verticalement */
   /* justify-content: center;  Centrer horizontalement */
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
    .AppGlass3 {
      grid-template-columns: 10% 50% auto;
      overflow-y: scroll;
    }
  }

  @media screen and (max-width: 768px) {
    .AppGlass3 {
      grid-template-columns: 1fr;
    }
  }

  `]
})
export default class ReservationComponent {

}
