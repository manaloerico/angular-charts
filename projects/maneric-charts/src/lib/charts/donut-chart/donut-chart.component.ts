import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BaseChartComponent } from '../../base-chart';

@Component({
  selector: 'donut-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss'],
})
export class DonutChartComponent extends BaseChartComponent<'doughnut'> {
  protected override getChartType(): 'doughnut' {
    return 'doughnut';
  }
}
