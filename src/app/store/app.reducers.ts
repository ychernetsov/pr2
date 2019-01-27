import * as fromRaceList from '../races/store/ponyracer.reducers';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    raceList: fromRaceList.State;
}

export const reducers: ActionReducerMap<AppState> = {
    raceList: fromRaceList.ponyRacerReducer
}