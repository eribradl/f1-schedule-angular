import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-api-call';
  fullData: any = null;
  raceData: any = null;
  currentlyDisplayedRound: number = 0;
  raceTime: any = null;
  sessionTimes: any = {};
  nextSessionTime: string = "";
  countryCode: string = "";

  constructor(private api:ApiService) {}

  ngOnInit() {
    this.api.getNextRace().subscribe((data)=> {
      this.fullData = data;
      this.raceData = this.fullData.MRData.RaceTable.Races[0];
      this.currentlyDisplayedRound = parseInt(this.raceData.round);
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
      this.sessionTimes = {};
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
    this.nextSessionTime = "";
    var keyList = Object.keys(this.raceData);
    var sessionKeys = keyList.slice(keyList.indexOf('time')+1);
    sessionKeys.forEach((key) => {
      var time = this.raceData[key].time;
      var date = this.raceData[key].date;
      var sessionTime = this.formatDateTime(date, time);
      var sessionTimeLongFormat = new Date(`${date}T${time}`);
      //console.log(this.raceTime.getTime() > Date.now())
      if (this.nextSessionTime === "" && sessionTimeLongFormat.getTime() > Date.now()){
        this.nextSessionTime = sessionTime;
        console.log(this.nextSessionTime)
      }
      this.sessionTimes[key] = sessionTime;
    })
  }

  returnZero() {     return 0;     }

  setCountryCode(countryCode: string) {
    this.countryCode = countryCode;
  }
}
