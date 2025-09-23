import { Plugin } from 'chart.js';
export interface CenterTextPluginOptions {
  fontSize?: number;
  fontColor?: string;
  subTitle?: string;
  text?: string;
  prefix?: string;
}

const defaultCenterTextPluginOptions: CenterTextPluginOptions = {
  fontSize: 20,
  fontColor: '#333',
};

export const centerTextPlugin: Plugin<any> = {
  id: 'centerText',
  afterDraw(chart, args, options: CenterTextPluginOptions) {
    const {
      ctx,
      chartArea: { left, right, top, bottom },
    } = chart;
    const opt = { ...defaultCenterTextPluginOptions, ...options };
    const { fontSize, fontColor, subTitle, text, prefix } = opt;

    const { width } = chart;
    const { height } = chart;
    const xCenter = (left + right) / 2;
    const yCenter = (top + bottom) / 2;
    const tFontSize = fontSize ?? 24;

    ctx.save();
    const dataset = chart.data.datasets[0].data as number[];
    const total = text ?? `${dataset.reduce((a, b) => a + b, 0)}`;
    const totalWithPrefix = prefix ? `${prefix}${total}` : total;
    ctx.font = `bold ${tFontSize}px Arial`;
    ctx.fillStyle = `${fontColor}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(totalWithPrefix, xCenter, yCenter);

    if (subTitle) {
      ctx.font = '12px Arial';
      ctx.fillStyle = '#666';
      ctx.fillText(subTitle, xCenter, (top + bottom) / 2 + tFontSize / 2);
    }
    ctx.restore();
  },
};
