import { ChartOptions } from 'chart.js';

export const defaultBarOptions: ChartOptions<'bar'> = {
  responsive: true,
  plugins: {
    legend: {
      labels: { color: '#333' },
    },
  },
  scales: {
    x: { ticks: { color: '#333' } },
    y: { ticks: { color: '#333' } },
  },
};
