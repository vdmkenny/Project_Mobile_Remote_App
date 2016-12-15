import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DBService } from '../../providers/db-service';

import { HomePage } from '../home/home'

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  constructor(public navCtrl: NavController, private myDBService: DBService) {
    if (!myDBService.isTokenValid()) {
      navCtrl.setRoot(HomePage);
    }
  }

  ionViewDidLoad() {
    console.log('Hello Settings Page');
  }
}