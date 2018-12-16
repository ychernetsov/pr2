import { Component, OnInit, OnDestroy } from '@angular/core';
import { RaceModel } from '../race.model';
import { RaceService } from '../race.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.css']
})
export class RacesComponent implements OnInit, OnDestroy {

  races: RaceModel[] = [];
  rColor: string;
  private subscription: Subscription
  constructor(private raceService: RaceService) { }
  randomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    console.log(color)
    return color;
  }

  ngOnInit() {
    this.rColor = this.randomColor()
    console.log(this.rColor)
    this.races = this.raceService.getReces();
    this.subscription = this.raceService.racesChanged
      .subscribe(
        ((races: RaceModel[]) => {
          this.races = races;
        })
      )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
