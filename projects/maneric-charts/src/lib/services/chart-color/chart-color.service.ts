import { Injectable } from '@angular/core';

export type ColorScheme = 'material' | 'category10' | 'pastel' | 'custom';

@Injectable({ providedIn: 'root' })
export class ChartColorService {
  // Fallback palettes
  private category10 = [
    '#1f77b4',
    '#ff7f0e',
    '#2ca02c',
    '#d62728',
    '#9467bd',
    '#8c564b',
    '#e377c2',
    '#7f7f7f',
    '#bcbd22',
    '#17becf',
  ];

  private pastel = [
    '#aec7e8',
    '#ffbb78',
    '#98df8a',
    '#ff9896',
    '#c5b0d5',
    '#c49c94',
    '#f7b6d2',
    '#c7c7c7',
    '#dbdb8d',
    '#9edae5',
  ];

  /**
   * Returns an array of colors for charts based on scheme and theme
   */
  getColors(scheme: ColorScheme, count: number, customColors?: string[]): string[] {
    switch (scheme) {
      case 'material':
        return this.expandMaterialColors(count);
      case 'category10':
        return this.repeatPalette(this.category10, count);
      case 'pastel':
        return this.repeatPalette(this.pastel, count);
      case 'custom':
        return this.repeatPalette(customColors ?? [], count);
      default:
        return this.repeatPalette(this.category10, count);
    }
  }

  /**
   * Expand Angular Material theme colors into multiple shades
   */
  private expandMaterialColors(count: number): string[] {
    const container = document.querySelector('.app-container') as HTMLElement;
    const styles = getComputedStyle(container);
    const baseColors = [
      styles.getPropertyValue('--chart-primary').trim() || '#1976d2',
      styles.getPropertyValue('--chart-accent').trim() || '#9c27b0',
      styles.getPropertyValue('--chart-warn').trim() || '#009688',
    ];
    // Generate shades for each base color
    const expanded = baseColors.flatMap((color) => this.generateShades(color, 3));
    console.log('expanded', expanded);
    return this.repeatPalette(expanded, count);
  }

  /**
   * Generate lighter/darker shades of a base color
   */
  private generateShades(hex: string, levels: number): string[] {
    const shades: string[] = [];
    for (let i = -levels; i <= levels; i++) {
      shades.push(this.adjustLightness(hex, i * 15));
    }
    return shades;
  }

  /**
   * Adjust lightness of hex color
   */
  private adjustLightness(hex: string, percent: number): string {
    const num = parseInt(hex.replace('#', ''), 16);
    let r = (num >> 16) + percent;
    let g = ((num >> 8) & 0x00ff) + percent;
    let b = (num & 0x0000ff) + percent;

    r = Math.min(255, Math.max(0, r));
    g = Math.min(255, Math.max(0, g));
    b = Math.min(255, Math.max(0, b));

    return `#${(b | (g << 8) | (r << 16)).toString(16).padStart(6, '0')}`;
  }

  /**
   * Repeat palette until count is satisfied
   */
  private repeatPalette(palette: string[], count: number): string[] {
    const result: string[] = [];
    for (let i = 0; i < count; i++) {
      result.push(palette[i % palette.length]);
    }
    return result;
  }
}
