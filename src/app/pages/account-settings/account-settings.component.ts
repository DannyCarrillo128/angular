import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {
  
  public element = document.querySelector('#theme');
  themes!: NodeListOf<Element>;

  constructor(
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.themes = document.querySelectorAll('.selector');
    this.settingsService.checkCurrentTheme(this.themes);
  }

  selectTheme(theme: string) {
    this.settingsService.selectTheme(theme, this.themes);
  }
 
}
