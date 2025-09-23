import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions } from 'chart.js';

import { BarChartComponent } from 'maneric-charts';
@Component({
  selector: 'app-bar-chart-page',
  templateUrl: './bar-chart-page.component.html',
  styleUrls: ['./bar-chart-page.component.scss'],
  imports: [BarChartComponent],
})
export class BarChartPageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  labels = ['Jan', 'Feb', 'Mar', 'Apr'];

  verticalData = [{ label: '2024', data: [30, 50, 40, 70] }];

  // horizontalData = [{ label: 'Sales', data: [60, 90, 120, 150] }];
  horizontalData = [
    {
      label: 'Dataset 1',
      data: [
        [10, 20],
        [10, 20],
        [10, 20],
        [10, 20],
      ],
    },
    {
      label: 'Dataset 2',
      data: [
        [10, 20],
        [10, 20],
        [10, 20],
        [10, 20],
      ],
    },
  ];

  options: ChartOptions<'bar'> = {
    plugins: {
      legend: {
        position: 'top',
      },
    },
    indexAxis: 'y',
  };
  stackedData: ChartDataset<'bar'>[] = [
    { label: 'Product A', data: [[10, 20], 30, 40, 50] },
    { label: 'Product B', data: [10, 15, 25, 35] },
    { label: 'Product C', data: [-40, 25, 15, 25] },
    { label: 'Product D', data: [33, 19, 42, 28] },
    { label: 'Product E', data: [47, 22, 14, 39] },
    { label: 'Product F', data: [11, 44, 36, 29] },
    { label: 'Product G', data: [28, 31, 17, 50] },
    { label: 'Product H', data: [22, 27, 35, 41] },
  ];
}
