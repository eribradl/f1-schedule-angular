import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-flag',
  templateUrl: './flag.component.html',
  styleUrls: ['./flag.component.css']
})
export class FlagComponent {
  @Input() countryCode: string = "";
  flagSource: string = "";

  ngOnChanges() {
    this.flagSource = `https://flagcdn.com/${this.countryCode}.svg`
  }
  
}


