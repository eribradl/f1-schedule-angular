import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as Leaflet from 'leaflet';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'my-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss',
  '../../../node_modules/leaflet/dist/leaflet.css'],
})
export class MapComponent {
  constructor(private http: HttpClient, private api: ApiService) {}

  @Input() raceData: any;
  @Output() countryCode = new EventEmitter;
  public map: any;
  public options: any = null;
  private firstRace: boolean = true;
  private geoJson: any;
  private centerpoint: number[] = [0,0];
  public mapReady = false;


  ngOnChanges() {
    this.api.getGeoJson(this.raceData.round).subscribe((json: any) => {
      this.geoJson = json;
      this.countryCode.emit(json.name.substring(0,2));
      this.centerpoint[1] = (this.geoJson.bbox[0] + this.geoJson.bbox[2]) / 2
      this.centerpoint[0] = (this.geoJson.bbox[1] + this.geoJson.bbox[3]) / 2
      this.drawMap();
    });
  }

  drawMap() {
    this.options = {
      layers: [
        Leaflet.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}')
      ],
      zoom: 14,
      center: Leaflet.latLng(this.centerpoint[0], this.centerpoint[1])
    };

    if (!this.firstRace) {
      this.map.setView(new Leaflet.LatLng(this.centerpoint[0], this.centerpoint[1]));
    }
    this.mapReady = true;
    this.firstRace = false;
  }

  onMapReady(map: Leaflet.Map) {
    Leaflet.geoJSON(this.geoJson).addTo(map);
    this.map = map;
  }
}

