import { Component, ViewChild } from "@angular/core";
import { NgApexchartsModule } from "ng-apexcharts";



import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke
} from "ng-apexcharts";
export type ChartOptions = {
  series: any;
  chart:any;
  xaxis: any;
  stroke: any;
  tooltip: any;
  dataLabels: any;
};

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [NgApexchartsModule],
  template: `

   <div id="chart">
  <apx-chart
    [series]="chartOptions.series"
    [chart]="chartOptions.chart"
    [xaxis]="chartOptions.xaxis"
    [stroke]="chartOptions.stroke"
    [tooltip]="chartOptions.tooltip"
    [dataLabels]="chartOptions.dataLabels">
  </apx-chart>
</div>
  `,
  styles: [`
  #chart {
    max-width: 400px;
    margin: 35px auto;
  }`]
})
export class chartComponent {
  @ViewChild("chart") chart !: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "ONG",
          data: [31, 40, 28, 51, 42, 60,80]
        },
        {
          name: "Entreprise",
          data: [11, 32, 45, 32, 34, 52, 41]
        },
        {
          name: "Particulier",
          data: [10, 23, 45, 29, 39, 57, 45]
        }
      ],
      chart: {
        height: 250,
        type: "area"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z"
        ]
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm"
        }
      }
    };
  }


public generateData(baseval:number,count:number, yrange:any) {
  var i = 0;
  var series = [];
  while (i < count) {
    var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;
    var y =
      Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
    var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

    series.push([x, y, z]);
    baseval += 86400000;
    i++;
  }
  return series;
}
}
