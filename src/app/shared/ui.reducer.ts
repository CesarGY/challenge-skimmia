import {createReducer, on} from '@ngrx/store';
import {isLoading, stopLoading} from './ui.actions';

export interface UIState {
    isLoading: boolean;
}

export const initialState: UIState = {
    isLoading: false
};

const _uiReducer = createReducer(initialState,
    on(isLoading, state => ({...state, isLoading: true})),
    on(stopLoading, state => ({...state, isLoading: false}))
);

export function uiReducer(state, action) {
    return _uiReducer(state, action);
}
