import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Chart, ChartDataset, ChartOptions, ChartType, registerables } from 'chart.js';
import { ChartColorService, ColorScheme } from '../services/chart-color/chart-color.service';

import ChartDataLabels from 'chartjs-plugin-datalabels';
import { merge } from 'lodash';
import { centerTextPlugin } from '../plugin';
Chart.register(...registerables, ChartDataLabels, centerTextPlugin);

@Component({
  template: '', // Extended by child components
})
export abstract class BaseChartComponent<TType extends ChartType>
  implements AfterViewInit, OnChanges, OnDestroy
{
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  @Input() labels: string[] = [];
  @Input() datasets: ChartDataset<TType>[] = [];
  @Input() title?: string;
  @Input() options?: ChartOptions<TType>;
  @Input() colorScheme: ColorScheme = 'material';
  @Input() colors?: string[];

  @Output() pointClick = new EventEmitter<{ label: string; value: number }>();
  @Output() chartInit = new EventEmitter<Chart>();

  chart?: Chart;
  protected readonly target = document.body.getElementsByTagName('div')[0];
  constructor(private colorService: ChartColorService) {
    // Watch for theme changes (when Angular Material theme switches dynamically)
    const observer = new MutationObserver(() => {
      console.log('trigger update chart');
      this.updateChart();
    });
    observer.observe(this.target, { attributes: true, attributeFilter: ['class'] });
  }

  ngAfterViewInit(): void {
    this.renderChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chart && (changes['datasets'] || changes['labels'] || changes['colors'])) {
      this.updateChart();
    }
  }

  private renderChart(): void {
    const ctx = this.canvas.nativeElement.getContext('2d');
    if (!ctx) return;

    const datasetColors = this.colorService.getColors(
      this.colorScheme,
      this.datasets.length,
      this.colors
    );

    const styledDatasets = this.datasets.map((d, i) => {
      const backgroundColor = this.colorService.getColors(
        this.colorScheme,
        d.data.length,
        this.colors
      );
      return {
        ...d,
        backgroundColor,
        borderColor: d.borderColor,
      };
    });

    const config = this.buildConfig(styledDatasets);
    if (!this.chart) {
      this.chart = new Chart(ctx, config);
    } else {
      this.chart = merge(this.chart, {
        data: merge(this.chart.data, {
          datasets: styledDatasets,
        }),
        options: config.options,
      });

      this.chart?.update();
    }

    this.chartInit.emit(this.chart);
  }

  private buildConfig(styledDatasets: any): any {
    const foregroundColor = this.colorService.getForegroundColor();
    console.log('foregroundColor', foregroundColor);
    const options = merge(
      {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: foregroundColor,
            },
          },
          centerText: {
            fontColor: foregroundColor,
          },
        },
        onClick: (_e: any, elements: any) => {
          if (elements.length > 0) {
            const first = elements[0];
            const datasetIndex = first.datasetIndex;
            const index = first.index;
            const label = this.labels[index];
            const value = this.datasets[datasetIndex].data[index] as number;
            this.pointClick.emit({ label, value });
          }
        },
      },
      this.options
    );
    return {
      type: this.getChartType(),
      data: {
        labels: this.labels,
        datasets: styledDatasets as any,
      },
      options,
    };
  }
  private updateChart(): void {
    this.renderChart();
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }

  /** Must be implemented by each chart type */
  protected abstract getChartType(): TType;
}
