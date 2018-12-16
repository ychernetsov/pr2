import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RaceService } from '../../race.service';
import { Subscription } from 'rxjs';
import { RaceModel } from '../../race.model';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit {
  addPonyForm = false;
  races: RaceModel[] = [];
  @Output() raceStarted = new EventEmitter<any>();

  private subscription: Subscription
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
  addPony() {
    this.addPonyForm = true;
  }
  onSubmit(f: NgForm) {
    this.raceService.addRace(f.value.name)
    this.addPonyForm = false;
  }

  startRace() {
    this.raceStarted.emit(true);
  }
}
