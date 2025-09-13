import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  // Store chart colors derived from Angular Material CSS variables
  chartColors = signal({
    primary: getComputedStyle(document.documentElement)
      .getPropertyValue('--md-sys-color-primary')
      .trim(),
    accent: getComputedStyle(document.documentElement)
      .getPropertyValue('--md-sys-color-secondary')
      .trim(),
    text: getComputedStyle(document.documentElement)
      .getPropertyValue('--md-sys-color-on-surface')
      .trim(),
  });

  constructor() {
    // Watch for theme changes (when Angular Material theme switches dynamically)
    const observer = new MutationObserver(() => this.updateColors());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    this.updateColors();
  }

  private updateColors() {
    this.chartColors.set({
      primary: getComputedStyle(document.documentElement)
        .getPropertyValue('--md-sys-color-primary')
        .trim(),
      accent: getComputedStyle(document.documentElement)
        .getPropertyValue('--md-sys-color-secondary')
        .trim(),
      text: getComputedStyle(document.documentElement)
        .getPropertyValue('--md-sys-color-on-surface')
        .trim(),
    });
  }
}
