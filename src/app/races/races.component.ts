import { Component, OnInit, OnDestroy } from '@angular/core';
import { RaceModel } from '../race.model';
import { RaceService } from '../race.service';
import { Subscription, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.css']
})
export class RacesComponent implements OnInit, OnDestroy {

  races: RaceModel[] = [];
  public racesStartedEvent: any;
  public toStartPosition: any;
  raceLength: number;
  poniesAreAboutToFinish;
  private subscription: Subscription;
  constructor(private raceService: RaceService) { }

  ngOnInit() {
    this.races = this.raceService.getReces();
    this.raceLength = this.races.length;
    this.poniesAreAboutToFinish = new BehaviorSubject(this.raceLength);
    this.subscription = this.raceService.racesChanged
      .subscribe(
        ((races: RaceModel[]) => {
          this.races = races;
          this.raceLength = this.races.length;
        })
      )
  }

  racesAreStarted(event: any) {
    this.racesStartedEvent = event;
  }

  toStartPos(event: any) {
    this.toStartPosition = event;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
