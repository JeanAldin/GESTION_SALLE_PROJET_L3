import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CommonModule } from '@angular/common';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const GET_calendre = gql`
query{
getcalendre{
title
start
end

}
}
`;
@Component({
  selector: 'app-calendre',
  standalone: true,
 imports: [CommonModule ,FullCalendarModule,FormsModule],
  template: `

    <div class="App9">
  <div class="AppGlass9">



      <full-calendar [options]="calendarOptions"></full-calendar>

    </div>
  </div>



  `,
  styles: [`:host {
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

  .App9 {
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

  .AppGlass9 {
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
    .AppGlass9 {
      grid-template-columns: 10% 50% auto;
      overflow-y: scroll;
    }
  }

  @media screen and (max-width: 768px) {
    .AppGlass9 {
      grid-template-columns: 1fr;
    }
  }




.calen {


}

full-calendar{
width:875px;
height:450px;
padding-right:60%;
color:grey;
padding: 10px;
border-radius: 10px;
background:white;
position:absolute;
top: 10%;
left: 29%;
}

.bout button {
  background-color: rgb(0, 140, 255);
  color: white;
  border: none;
  padding: 10px 10px;
  cursor: pointer;
}



  `]
})
export default class  CalendreComponent implements OnInit{
  date: any[] = [];
  constructor(private apollo: Apollo) {}
  ngOnInit(): void {

    this.apollo
    .watchQuery({
      query:GET_calendre,
    })
    .valueChanges.subscribe(({ data, error }: any) => {
      this.date = data.getcalendre;

      this.updateEvents();
console.log(this.date)
    });

  }

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    weekends: true,
     events:  this.date
  };

  newEvent = { title: '',start: '', end: '' };

  /* modal [
      { title: 'Meeting',start: new Date(), end: new Date(new Date().getTime() + (60 * 60 * 1000)) },
      { title: 'Meeting 2', start: '2024-04-26T14:00:00', end: '2024-04-26T16:00:00'  },
      { title: 'jour de test', start: '2024-04-21T14:00:00', end: '2024-04-24T16:00:00' },
    ] */
     updateEvents(): void {
      const formattedEvents = this.date.map((event: any) => ({
        title: event.title,
        start: new Date(event.start),
        end: new Date(event.end),
      }));
      this.calendarOptions.events = formattedEvents;
    }


}
