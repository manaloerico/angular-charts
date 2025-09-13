import { Injectable } from '@angular/core';

const THEME_KEY = 'demo-page-theme';
type ThemeName =
  | 'indigo-pink'
  | 'deeppurple-amber'
  | 'pink-bluegrey'
  | 'purple-green'
  | 'cyan-orange'
  | 'cyan-themed'
  | 'rose-red';

const THEME_NAMES: ThemeName[] = [
  'indigo-pink',
  'deeppurple-amber',
  'pink-bluegrey',
  'purple-green',
  'cyan-orange',
  'cyan-themed',
  'rose-red',
];
export interface ThemeList {
  label: string;
  themeValue: ThemeName;
}
@Injectable({
  providedIn: 'root',
})
export class ThemingService {
  private currentTheme: ThemeName = 'cyan-orange';

  constructor() {
    const stored = localStorage.getItem(THEME_KEY) as ThemeName | null;
    if (stored) {
      this.currentTheme = stored;
    }
  }

  get themeList(): ThemeList[] {
    return THEME_NAMES.map((themeValue) => ({
      label: themeValue.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      themeValue,
    }));
  }
  get theme(): ThemeName {
    return this.currentTheme;
  }

  setTheme(name: ThemeName): void {
    this.currentTheme = name;
    localStorage.setItem(THEME_KEY, name);
  }
}
