import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  
  private geoJson: any = null;

  private geoJsonUrls: {[index:number]: string} = {
    1: "https://raw.githubusercontent.com/bacinger/f1-circuits/master/circuits/bh-2002.geojson", //Bahrain
    2: "https://raw.githubusercontent.com/bacinger/f1-circuits/master/circuits/sa-2021.geojson", //Saudi Arabia
    3: "https://raw.githubusercontent.com/bacinger/f1-circuits/master/circuits/au-1953.geojson", //Australia
    4: "https://raw.githubusercontent.com/bacinger/f1-circuits/master/circuits/az-2016.geojson", //Azerbaijan
    5: "https://raw.githubusercontent.com/bacinger/f1-circuits/master/circuits/us-2022.geojson", //Miami
    6: "https://raw.githubusercontent.com/bacinger/f1-circuits/master/circuits/it-1953.geojson", //Imola
    7: "https://raw.githubusercontent.com/bacinger/f1-circuits/master/circuits/mc-1929.geojson", //Monaco
    8: "https://raw.githubusercontent.com/bacinger/f1-circuits/master/circuits/es-1991.geojson", //Spain
    9: "https://raw.githubusercontent.com/bacinger/f1-circuits/master/circuits/ca-1978.geojson", //Canada
    10: "https://raw.githubusercontent.com/bacinger/f1-circuits/master/circuits/at-1969.geojson", //Austria
    11: "https://raw.githubusercontent.com/bacinger/f1-circuits/master/circuits/gb-1948.geojson", //Great Britain
    12: "https://raw.githubusercontent.com/bacinger/f1-circuits/master/circuits/hu-1986.geojson", //Hungary
    13: "https://raw.githubusercontent.com/bacinger/f1-circuits/master/circuits/be-1925.geojson", //Belgium
    14: "https://raw.githubusercontent.com/bacinger/f1-circuits/master/circuits/nl-1948.geojson", //Netherlands
    15: "https://raw.githubusercontent.com/bacinger/f1-circuits/master/circuits/it-1922.geojson", //Monza
    16: "https://raw.githubusercontent.com/bacinger/f1-circuits/master/circuits/sg-2008.geojson", //Singapore
    17: "https://raw.githubusercontent.com/bacinger/f1-circuits/master/circuits/jp-1962.geojson", //Japan
    18: "https://raw.githubusercontent.com/bacinger/f1-circuits/master/circuits/qa-2004.geojson", //Qatar
    19: "https://raw.githubusercontent.com/bacinger/f1-circuits/master/circuits/us-2012.geojson", //Austin
    20: "https://raw.githubusercontent.com/bacinger/f1-circuits/master/circuits/mx-1962.geojson", //Mexico
    21: "https://raw.githubusercontent.com/bacinger/f1-circuits/master/circuits/br-1940.geojson", //Brazil
    22: "https://raw.githubusercontent.com/bacinger/f1-circuits/master/circuits/us-2023.geojson", //Las Vegas
    23: "https://raw.githubusercontent.com/bacinger/f1-circuits/master/circuits/ae-2009.geojson", //Abu Dhabi
  }

  getNextRace() {
    return this.http.get('https://ergast.com/api/f1/current/next.json');
  }

  getRaceByRound(roundNumber: number) {
    return this.http.get(`https://ergast.com/api/f1/current/${roundNumber}.json`);
  }

  getGeoJson(roundNumber: string) {
    var url = this.geoJsonUrls[parseInt(roundNumber)];
    return this.http.get(url);
  }
}