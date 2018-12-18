import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RaceService } from '../../race.service';
import { Subscription, BehaviorSubject } from 'rxjs';
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
  @Output() newRace = new EventEmitter<any>();

  @Input() poniesAreAboutToFinish: BehaviorSubject<number>;
  @Input() raceLength: number;
  raceRuns: boolean = false;
  isNameValid: boolean = false;

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

  addPony() {
    this.addPonyForm = true;
    
  }
  validateName(val: string) {
    this.isNameValid = this.raceService.validateName(val);
  }
  onSubmit(f: NgForm) {
    this.raceLength = this.raceLength + 1;
    this.poniesAreAboutToFinish.next(this.raceLength);
    this.raceService.addRace(f.value.name)
    this.addPonyForm = false;
  }

  startRace() {
    this.newRace.emit(false);
    this.raceRuns = true;
    this.raceStarted.emit(true);
  }

  toStart() {
    this.raceStarted.emit(false);
    this.raceRuns = false;
    this.poniesAreAboutToFinish.next(this.raceLength);
    this.newRace.emit(true);
  }

  cancel() {
    this.addPonyForm = false;
  }
}
