import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions } from 'chart.js';
import { DonutChartComponent } from 'maneric-charts';

@Component({
  selector: 'app-donut-chart-page',
  standalone: true,
  imports: [CommonModule, DonutChartComponent],
  templateUrl: './donut-chart-page.component.html',
  styleUrls: ['./donut-chart-page.component.scss'],
})
export class DonutChartPageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  labels = ['Jan', 'Feb', 'Mar', 'Apr', 'Jan', 'Feb', 'Mar', 'Apr'];
  options: ChartOptions<any> = {
    plugins: {
      legend: {
        position: 'right',
      },
      datalabels: {
        display: false,
      },
      centerText: {
        prefix: '₱',
        fontSize: 50, // bigger
        subTitle: 'haha',
      },
    },
    indexAxis: 'y',
    cutout: '50%',
  };
  stackedData: ChartDataset<'doughnut'>[] = [{ data: [10, 30, 40, 50, 10, 30, 40, 50] }];
}
