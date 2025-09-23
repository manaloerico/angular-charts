import { Routes } from '@angular/router';
import { BarChartPageComponent } from './pages/bar-chart-page/bar-chart-page.component';
import { DonutChartPageComponent } from './pages/donut-chart-page/donut-chart-page.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'bar-chart' },
  {
    path: 'bar-chart',
    component: BarChartPageComponent,
  },
  {
    path: 'donut-chart',
    component: DonutChartPageComponent,
  },
];
