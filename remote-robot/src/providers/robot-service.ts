import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

//Import custom model
import { Robot } from '../models/robot';

/*
  Generated class for the RobotService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class RobotService {
	robotUrl = 'http://192.168.56.101:5000/';

  constructor(public http: Http) {
    console.log(""+this.getRobot());
  }

  //-------------------------------------------------
  //Darm-deel
  //-------------------------------------------------

  //Initializes robot
  getRobot(): Observable<Robot> {
    return this.http.get(`${this.robotUrl}/getRobot()`)
      .map(res => <Robot>res.json());
  }
/*
  //Gets IP of current bot
  getIP(): any {
    return this.http.get(`${this.robotUrl}/getBatteryLevel`).map(res => res.json());
  }
*/

  //-------------------------------------------------
  //Skagoo-deel
  //-------------------------------------------------

}
