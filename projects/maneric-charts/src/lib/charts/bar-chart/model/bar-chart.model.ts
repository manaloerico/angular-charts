export type BarVariant = 'vertical' | 'horizontal' | 'stacked' | 'grouped';

export interface BarChartDataset {
  label: string;
  data: number[];
  backgroundColor?: string | string[];
  borderColor?: string | string[];
}
