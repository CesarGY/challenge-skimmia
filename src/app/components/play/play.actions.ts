import {createAction, props} from '@ngrx/store';
import {Song} from '../../models/song';

export const songs = createAction('[Play] List Songs');
export const selectSong = createAction('[Play] Select Song',
    props<{ songId: Song }>()
);
export const playSong = createAction(
    '[Play] Play Song',
    props<{ songId: number }>()
);
