import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { NavController } from 'ionic-angular';

import { RobotService } from '../../providers/robot-service';
import { DBService } from '../../providers/db-service';
import { ShareService } from '../services/ShareService';

import { ActionsPage } from '../actions/actions'
import { ManualPage } from '../manual/manual'
import { SayPage } from '../say/say'
import { SettingsPage } from '../settings/settings'

import { Robot } from '../../models/robot'

import * as $ from "jquery";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',

  animations: [
 
    //For the logo
    trigger('flyInBottomSlow', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({transform: 'translate3d(0,2000px,0'}),
        animate('2000ms ease-in-out')
      ])
    ]),
 
    //For the background detail
    trigger('flyInBottomFast', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({transform: 'translate3d(0,2000px,0)'}),
        animate('1000ms ease-in-out')
      ])
    ]),
 
    //For the login form
    trigger('bounceInBottom', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        animate('2000ms 200ms ease-in', keyframes([
          style({transform: 'translate3d(0,2000px,0)', offset: 0}),
          style({transform: 'translate3d(0,-20px,0)', offset: 0.9}),
          style({transform: 'translate3d(0,0,0)', offset: 1}) 
        ]))
      ])
    ]),
 
    //For login button
    trigger('fadeIn', [
      state('in', style({
        opacity: 1
      })),
      transition('void => *', [
        style({opacity: 0}),
        animate('1000ms 2000ms ease-in')
      ])
    ])
  ]
})
export class HomePage {

	//Style purposes
	logoState: any = "in";
  	cloudState: any = "in";
  	loginState: any = "in";
  	formState: any = "in";
	//============

	loginSuccess: boolean;
	robotService: RobotService;
	dbService: DBService;
	ip = {address: ''};
	shareService: ShareService;
	splashImg: string;

  constructor(public navCtrl: NavController, private myShareService: ShareService, private myRobotService: RobotService, private myDBService: DBService) {
		this.robotService = myRobotService;
		this.dbService = myDBService;
		this.shareService = myShareService;		
	}

	loginForm(form) {
		//IP input
		var input = form.value.address;

    	console.log("LOGIN-ENTRY: " + input);
		this.robotService.login(input).subscribe(response => {

			if(response.status == 200) {
				console.log("CORRECT RESPONSE STATUS");
				this.robotService.getRobot().subscribe(
					response => {
						this.shareService.setRobot(
							new Robot(response.ip, response.type, response.name, response.batteryLevel, response.chargeStatus, response.posture, response.actions)
						);
						this.splashImg = this.shareService.getRobot().getSplashImg();
							//Write IP to database
						console.log("IP: ");
						this.dbService.addRobot(this.shareService.getRobot());
						// this.dbService.testPost();
					}

				);
				this.loginSuccess = true;		
				this.myDBService.setToken(true);

				console.log(this.dbService.getRecentRobots());

			} else {
				console.log("FALSE RESPONSE STATUS");
				this.loginSuccess = false;
			}	
		});
	};

	imgPressed() {
		$('#main-buttons').fadeToggle();
	}

	

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