import { Injectable } from '@angular/core';
import { Robot } from '../models/robot';
import {Http, Headers, RequestOptions} from '@angular/http';

@Injectable()
export class DBService {
	dbUrl = 'http://darm.cloudant.com/roboto';
  doc: string;
  robots: JSON[];
  list: String[];
  tokenDoc: string;

  constructor(public http: Http) {
    this.robots = [];
    this.getFromDB().subscribe(response => this.doc = response);
    this.getTokenFromDB().subscribe(response => this.tokenDoc = response);
  }

  //-------------------------------------------------
  //GET DOCS
  //-------------------------------------------------
  getRecentRobots(): any {
    this.getFromDB().subscribe(response => this.doc = response);

    var temp = this.doc["robots"];

    //Assign robots in temp-var to this.robots array
    for (var r of temp) {
      this.robots.push(r);
    }

    return this.robots;
  }


  getFromDB(): any {
    return this.http.get(`${this.dbUrl}/recentRobots`).map(res => res.json());
  }

  //-------------------------------------------------
  //INTERNAL METHODS
  //-------------------------------------------------
  checkExistingIP(ip): Boolean {
    return String(this.robots).includes(ip);
  }

  //-------------------------------------------------
  //UPDATE DOCS
  //-------------------------------------------------
  addRobot(robot: Robot) {

    var ip = robot.getIP();
    var name = robot.getName();

    if(!this.checkExistingIP(ip)) {      
      var jsonStructure = JSON.stringify({
        'ip': ip,
        'name': name
      });

      if(this.robots.length <= 0)
        this.robots[0] = JSON.parse(jsonStructure);
      else
        this.robots.push(JSON.parse(jsonStructure));

      var tempDoc = this.doc;
      tempDoc["robots"] = JSON.parse(JSON.stringify(this.robots));

      var headers = new Headers({ 'Content-Type': 'application/json' });
      var options = new RequestOptions({headers: headers});

      this.http.put(`${this.dbUrl}/recentRobots`, tempDoc, options)
        .subscribe(response => console.log(response));
    }
    else
      console.log("IP ALREADY PRESENT IN DOC");
  }

  
  //-------------------------------------------------
  //TOKEN
  //-------------------------------------------------

  getTokenFromDB() {
    return this.http.get(`${this.dbUrl}/token`).map(res => res.json());
  }

  getToken() {
    this.getTokenFromDB().subscribe(response => this.tokenDoc = response);
    return this.tokenDoc;
    // this.getTokenFromDB().subscribe(response => token = response.json()["timestamp"]);
  }

  setToken(isValid: Boolean) {
    var d = new Date();
    var t = d.getTime();

    // var token = {
    //   "_id": "token",
    //   "timestamp": t.toString()
    // };

    this.tokenDoc["timestamp"] = t.toString();
    this.tokenDoc["isValid"] = isValid;

    var headers = new Headers({ 'Content-Type': 'application/json' });
    var options = new RequestOptions({headers: headers});

    console.log(this.tokenDoc);

    this.http.put(`${this.dbUrl}/token`, this.tokenDoc, options)
        .subscribe(response => console.log(response));
  }

  isTokenValid() {
    var d = new Date();
    var t = d.getTime();

    var tokenDoc = this.getToken()
    var token = Number.parseInt(tokenDoc["timestamp"]);

    //7200000 is 2 hours in milseconds
    if (t - token <= 7200000 && tokenDoc["isValid"])
      return true;
    else
      return false;
  }
}