import {createReducer, on} from '@ngrx/store';
import {Song} from '../../models/song';
import {playSong} from './play.actions';

const initialState: Song[] = [
    {
        id: 0,
        name: 'Esta es mi fiesta',
        soundTrack: 'XANA-ESTA-ES-MI-FIESTA.mp3',
        enable: false,
        imageAlbum: './assets/img/img-1.jpg',
    },
    {
        id: 1,
        name: 'Ben sound',
        soundTrack: 'bensound-anewbeginning.mp3',
        enable: false,
        imageAlbum: './assets/img/img-2.jpg'
    },
    {
        id: 2,
        name: 'Heads will roll',
        soundTrack: 'yeah_yeah_yeahs_-_heads_will_roll_a-trak_remix.mp3',
        enable: false,
        imageAlbum: './assets/img/img-3.jpg'
    },
    {
        id: 3,
        name: 'One last time',
        soundTrack: 'Ariana Grande-One-Last Time.mp3',
        enable: false,
        imageAlbum: './assets/img/ariana.jpg'
    }

];

const _playReducer = createReducer(initialState,
    on(playSong, (state, {songId}) => (state.map(song =>
        ((song.id === songId) ? ({...song, enable: true}) : ({...song, enable: false})))))
);

export function playReducer(state, action) {
    return _playReducer(state, action);
}
