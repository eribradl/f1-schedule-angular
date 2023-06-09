import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  public countryCode: string = "";
  public geoJson: any;
  
  private geoJsonIds: {[circuitId:string]: string} = {
    "bahrain": "bh-2002",
    "jeddah": "sa-2021",
    "albert_park": "au-1953",
    "baku": "az-2016",
    "miami": "us-2022",
    "monaco": "mc-1929",
    "catalunya": "es-1991",
    "villeneuve": "ca-1978",
    "red_bull_ring": "at-1969",
    "silverstone": "gb-1948",
    "hungaroring": "hu-1986",
    "spa": "be-1925",
    "zandvoort": "nl-1948",
    "monza": "it-1922",
    "marina_bay": "sg-2008",
    "suzuka": "jp-1962",
    "losail": "qa-2004",
    "americas": "us-2012",
    "rodriguez": "mx-1962",
    "interlagos": "br-1940",
    "vegas": "us-2023",
    "yas_marina": "ae-2009",
  }

  getNextRace() {
    return this.http.get('https://ergast.com/api/f1/current/next.json');
  }

  getRaceByRound(roundNumber: number) {
    return this.http.get(`https://ergast.com/api/f1/current/${roundNumber}.json`);
  }

  getGeoJson(circuitId: string) {
    var geoJsonId = this.geoJsonIds[circuitId];
    var url = `https://raw.githubusercontent.com/bacinger/f1-circuits/master/circuits/${geoJsonId}.geojson`;
    return this.http.get(url);
  }
}