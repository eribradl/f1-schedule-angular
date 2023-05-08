import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapComponent } from './map/map.component';
import { FlagComponent } from './flag/flag.component';
import { TimetableComponent } from './timetable/timetable.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    FlagComponent,
    TimetableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LeafletModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
