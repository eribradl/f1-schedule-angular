import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-flag',
  templateUrl: './flag.component.html',
  styles: ['img { max-width: 200px; width: 50vw; }']
})
export class FlagComponent {
  @Input() countryCode: string = "";
  flagSource: string = "";

  ngOnChanges() {
    this.flagSource = `https://flagcdn.com/${this.countryCode}.svg`
  }
  
}


