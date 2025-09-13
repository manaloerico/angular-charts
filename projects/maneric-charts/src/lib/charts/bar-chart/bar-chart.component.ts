import { Component } from '@angular/core';
import { BaseChartComponent } from '../../base-chart/base-chart.component';

@Component({
  selector: 'bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent extends BaseChartComponent<'bar'> {
  protected override getChartType(): 'bar' {
    return 'bar';
  }
}
