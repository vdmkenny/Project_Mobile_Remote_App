import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { RobotService } from '../../providers/robot-service';
import {ShareService} from '../services/ShareService';

import { ActionsPage } from '../actions/actions'
import { ManualPage } from '../manual/manual'
import { SayPage } from '../say/say'
import { SettingsPage } from '../settings/settings'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	loginSuccess: Boolean;
	robotService: RobotService;
	ip = {adress: ''};
	shareService: ShareService;

  constructor(public navCtrl: NavController, private myShareService: ShareService, private myRobotService: RobotService) {
		this.robotService = myRobotService;
		this.shareService = myShareService;
	}

	loginForm(form) {
    console.log(form.value.adress);
		// this.robotService.login(form.value.adress);

		this.robotService.login(form.value.adress).subscribe(response => {
			console.log(response)
			if(response.status == 200) {
				this.robotService.getRobot().subscribe(response => {
					this.shareService.setRobot(response);
				});
				this.loginSuccess = true;				
			}
			else {
				this.loginSuccess = false;
			}	
		})
	};

	drawCircle() {
		var c = <HTMLCanvasElement>document.getElementById("canvas");
		var ctx = c.getContext("2d");
		ctx.beginPath();
		ctx.arc(200,200,175,0,2*Math.PI);
		ctx.fillStyle = 'rgb(0, 78, 104, 0,5)';
		ctx.fill();	
	};

	openActions() {
		console.log("Actions page button clicked")
		this.navCtrl.push(ActionsPage);
	}	

	openSay() {
		this.navCtrl.push(SayPage);
	}

	openSettings() {
		this.navCtrl.push(SettingsPage);
	}

	openManual() {
		this.navCtrl.push(ManualPage);
	}
}