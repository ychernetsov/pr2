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
  //poniesFinished: number = 0;
  poniesFinished = new BehaviorSubject(0);
  private subscription: Subscription;
  constructor(private raceService: RaceService) { }

  ngOnInit() {
    this.races = this.raceService.getReces();
    this.subscription = this.raceService.racesChanged
      .subscribe(
        ((races: RaceModel[]) => {
          this.races = races;
        })
      )
  }

  racesAreStarted(event: any) {
    this.racesStartedEvent = event;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
