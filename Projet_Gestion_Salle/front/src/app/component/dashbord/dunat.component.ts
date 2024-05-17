import { Component, ViewChild } from "@angular/core";
import { ChartComponent } from "ng-apexcharts";

import { NgApexchartsModule } from "ng-apexcharts";
import { CommonModule } from "@angular/common";
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";

export type ChartOptions = {
  series :any ;
  chart: any;
  responsive: any;
  labels: any;
};
@Component({
  selector: 'app-dunat',
  standalone: true,
  imports: [NgApexchartsModule,CommonModule ],
  template: `
  <div id="chart">
  <apx-chart
    [series]="chartOptions.series"
    [chart]="chartOptions.chart"
    [labels]="chartOptions.labels"
    [responsive]="chartOptions.responsive"
  ></apx-chart>
</div>


  `,
  styles: ``
})
export class DunatComponent {

  @ViewChild("chart") chart !: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [44, 26, 40],
      chart: {
        width: 380,
        type: "donut"
      },
      labels: ["ONG", "Particulier", "Entreprise"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }


}
