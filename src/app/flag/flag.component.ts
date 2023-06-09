import { Component, Input } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-flag',
  templateUrl: './flag.component.html',
  styles: ['img { max-width: 200px; width: 50vw; }']
})
export class FlagComponent {
  flagSource: string = "";
  constructor(private api: ApiService) {}

  ngOnInit() {
    this.flagSource = `https://flagcdn.com/${this.api.countryCode}.svg`
  }  
}
