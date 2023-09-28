import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { SidebarService } from 'src/app/services/sidebar.service';

declare function customInitFunctions(): any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styles: [
  ]
})
export class MainComponent implements OnInit {

  constructor(
    private settingsService: SettingsService,
    private sidebarService: SidebarService
  ) { }

  ngOnInit() {
    customInitFunctions();
    this.sidebarService.loadMenu();
  }

}
