import * as fromRaceList from '../races/store/ponyracer.reducers';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';

export interface AppState {
    raceList: fromRaceList.State;
}

export const reducers: ActionReducerMap<AppState> = {
    raceList: fromRaceList.ponyRacerReducer
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];