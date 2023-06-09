import { Component, OnInit } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'f1-schedule-angular';
  fullData: any = null;
  raceData: any = null;
  currentlyDisplayedRound: number = 0;
  raceTime: any = null;
  allSessionTimes: any = {};
  sessionTimes: any = {};
  nextSessionTime: any = {};
  countryCode: string = "";

  constructor(private api:ApiService) {}

  ngOnInit() {
    this.api.getNextRace().subscribe((data)=> {
      this.fullData = data;
      this.raceData = this.fullData.MRData.RaceTable.Races[0];
      this.currentlyDisplayedRound = parseInt(this.raceData.round);
      this.api.getGeoJson(this.raceData['Circuit']['circuitId'])
      .subscribe((geoJson: any) => {
        this.api.countryCode = (geoJson.name.substring(0,2));
        this.api.geoJson = geoJson;
      })
      this.getSessionTimes();
    })
  }

  incrementRound() {
    if (this.currentlyDisplayedRound < 23) {
      this.currentlyDisplayedRound++;
      this.updateRound()
    }
  }

  decrementRound() {
    if (this.currentlyDisplayedRound > 1) {
      this.currentlyDisplayedRound--;
      this.updateRound()
    }
  }

  updateRound() {
    this.raceData = null
    this.api.getRaceByRound(this.currentlyDisplayedRound).subscribe((data)=> {
      this.allSessionTimes = {};
      this.nextSessionTime = {};
      this.fullData = data;
      this.raceData = this.fullData.MRData.RaceTable.Races[0];
      this.getSessionTimes();
    })
  }

  formatDateTime(dateString: string, timeString: string) {
    var myDate =  new Date(`${dateString}T${timeString}`)
      .toLocaleString(navigator.languages[0]);
    return myDate;
  }

  getSessionTimes() {
    this.raceTime = this.formatDateTime(this.raceData.date, this.raceData.time);
    var keyList = Object.keys(this.raceData);
    var sessionKeys = keyList.slice(keyList.indexOf('time')+1);
    sessionKeys.forEach((key) => {
      var time = this.raceData[key].time;
      var date = this.raceData[key].date;
      var sessionTime = this.formatDateTime(date, time);
      var sessionTimeLongFormat = new Date(`${date}T${time}`);
      if (Object.entries(this.nextSessionTime).length === 0 && sessionTimeLongFormat.getTime() > Date.now()){
        this.nextSessionTime[key]=sessionTime;
        this.sessionTimes[key]=sessionTime;
      }
      this.allSessionTimes[key] = sessionTime;
    })
  }

  addSessionTimes() {
    this.sessionTimes = this.allSessionTimes;
  }

  removeSessionTimes() {
    this.sessionTimes = this.nextSessionTime;
  }

  onClick(event: any) {
    var midX = window.innerWidth/2
    if (midX - event.clientX > (200)) {
      this.decrementRound()
    } else if (midX - event.clientX < (-200)){
      this.incrementRound()
    }
  }

  setCountryCode(countryCode: string) {
    this.countryCode = countryCode;
  }
}
