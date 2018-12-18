import { Component, OnInit, Input } from '@angular/core';
import { RaceService } from 'src/app/race.service';
import { RaceModel } from 'src/app/race.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-show-information',
  templateUrl: './show-information.component.html',
  styleUrls: ['./show-information.component.css']
})
export class ShowInformationComponent implements OnInit {
  @Input() raceLength: number;
  races: RaceModel[];
  
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

}
