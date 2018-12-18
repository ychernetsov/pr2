import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RaceService } from 'src/app/race.service';
import { RaceModel } from 'src/app/race.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-show-information',
  templateUrl: './show-information.component.html',
  styleUrls: ['./show-information.component.css']
})
export class ShowInformationComponent implements OnInit, OnChanges {
  @Input() raceLength: number;
  @Input() event:any;
  races: RaceModel[];
  raceCount: number = 0;
  
  private subscription: Subscription
  constructor(private raceService: RaceService) { }

  ngOnInit() {
    this.races = this.raceService.getReces();
    this.subscription = this.raceService.racesChanged
      .subscribe(
        ((races: RaceModel[]) => {
          this.races = this.raceService.sortRaces(races);
        })
    )
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.event && changes.event.currentValue) this.raceCount++
  }

  reset() {
    this.raceService.resetScores();
    this.raceCount = 0;
  }
}
