import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { RobotService } from '../../providers/robot-service';
import { ShareService } from '../services/ShareService';
import { DBService } from '../../providers/db-service';

import { HomePage } from '../home/home'

@Component({
  selector: 'page-manual',
  templateUrl: 'manual.html'
})
export class ManualPage {

  robotService: RobotService;
  shareService: ShareService;
  actions: String[];

  constructor(public navCtrl: NavController, private myShareService: ShareService, private myRobotService: RobotService, private myDBService: DBService) {
    if (!myDBService.isTokenValid()) {
      navCtrl.setRoot(HomePage);
    }

    this.robotService = myRobotService;
    this.shareService = myShareService;
    this.actions = this.shareService.getRobot().getActions();
  }

  ionViewDidLoad() {
    console.log('Hello Manual Page');
  }
}