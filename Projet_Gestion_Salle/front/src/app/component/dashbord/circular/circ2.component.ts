import { Component } from '@angular/core';
import { IgxProgressBarModule } from 'igniteui-angular';
import { IGX_CIRCULAR_PROGRESS_BAR_DIRECTIVES } from 'igniteui-angular';
@Component({
  selector: 'app-circ2',
  standalone: true,
  imports: [IgxProgressBarModule,IGX_CIRCULAR_PROGRESS_BAR_DIRECTIVES ],
  template: `

  <igx-circular-bar
[value]="85"
[animate]="true"
class="custom-size"
></igx-circular-bar>
  `,

   styles: [`.custom-size {
   position:absolute;
    width: 70px;
    height: 70px;
}
  `]
})
export class Circ2Component {

}
