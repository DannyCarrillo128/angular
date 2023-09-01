import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  
  private element = document.querySelector('#theme');

  constructor() {
    let styleUrl = localStorage.getItem('theme') ?? './assets/css/colors/default-dark.css';
    this.element?.setAttribute('href', styleUrl);
  }

  selectTheme(theme: string, themes: NodeListOf<Element>) {
    const styleUrl = `./assets/css/colors/${ theme }.css`;
    this.element?.setAttribute('href', styleUrl);
    localStorage.setItem('theme', styleUrl);
    
    this.checkCurrentTheme(themes);
  }

  checkCurrentTheme(themes: NodeListOf<Element>) {
    const selectedTheme = this.element?.getAttribute('href');

    themes.forEach(theme => {
      theme.classList.remove('working');

      let themeName = theme.getAttribute('data-theme');
      let themeUrl = `./assets/css/colors/${ themeName }.css`;

      if (selectedTheme === themeUrl) {
        theme.classList.add('working');
      }
    });
  }

}
