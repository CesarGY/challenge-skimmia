import {ActionReducerMap} from '@ngrx/store';
import * as auth from './components/auth/auth.reducer';
import * as ui from './shared/ui.reducer';
import * as play from './components/play/play.reducer';
import {Song} from './models/song';

export interface AppState {
    auth: auth.AuthState;
    ui: ui.UIState;
    songs: Song[]
}

export const appReducers: ActionReducerMap<AppState> = {
    auth: auth.authReducer,
    ui: ui.uiReducer,
    songs: play.playReducer
};
