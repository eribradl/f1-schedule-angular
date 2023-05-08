import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss']
})
export class TimetableComponent {
  @Input() raceTime: string = ""
  @Input() nextSessionTime: string = "";
  @Input() sessionTimes: any = {};

  returnZero() {     return 0;     }

}
