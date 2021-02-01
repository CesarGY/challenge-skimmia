import {Component, OnInit, ViewChild} from '@angular/core';
import {MatProgressBar} from '@angular/material/progress-bar';
import {Song} from '../../models/song';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.reducer';
import {playSong} from './play.actions';

@Component({
    selector: 'app-play',
    templateUrl: 'play.component.html',
    styleUrls: ['play.css']
})
export class PlayComponent implements OnInit {

    songs: Song[] = [];

    currentSong: string;
    currentSongAlbum: string;
    player: HTMLAudioElement;
    source: HTMLSourceElement;

    @ViewChild('progress')
    progressBar: MatProgressBar;

    progressValue = 0;
    currentIndex = new Array(1);

    constructor(private store: Store<AppState>) {

    }

    ngOnInit() {
        this.player = document.querySelector('#player');
        this.source = document.querySelector('#source');
        this.currentIndex[0] = 0;

        this.store.select('songs').subscribe(songs => {
            this.songs = songs;
        });
    }

    selectItem(songId) {
        this.loadCurrentSong(songId);
    }

    removeActive() {
        const listSongs = document.querySelector('#list-songs');
        listSongs.querySelectorAll('.list-item-active').forEach(item => {
            item.classList.remove('list-item-active');
        });
    }

    loadSong(path: string) {
        this.source.src = `assets/songs/${path}`;
        this.player.load();
    }

    previousSong() {
        const currentSong = Number(this.currentIndex[0]);
        let prev;
        if (currentSong === 0) {
            prev = this.songs.length - 1;
        } else {
            prev = currentSong - 1;
        }

        this.loadCurrentSong(prev);
    }

    togglePlay() {
        if (this.source.src.toString().includes('songs')) {
            if (this.player.paused) {
                return this.player.play();
            } else {
                return this.player.pause();
            }
        } else {
            this.loadCurrentSong(0);
        }
    }

    nextSong() {
        const currentSong = Number(this.currentIndex[0]);
        let next;
        if (this.songs.length === (currentSong + 1)) {
            next = 0;
        } else {
            next = currentSong + 1;
        }
        this.loadCurrentSong(next);
    }

    rewind(e) {
        this.player.currentTime = (e.offsetX / this.progressBar._elementRef.nativeElement.offsetWidth) * this.player.duration;
    }

    loadCurrentSong(index: number) {

        this.removeActive();

        const item = document.getElementById(`${index}`);
        item.classList.add('list-item-active');
        this.currentIndex[0] = index;
        this.loadSong(this.songs[index].soundTrack);
        this.currentSong = this.songs[index].name;
        this.currentSongAlbum = this.songs[index].imageAlbum;
        this.store.dispatch(playSong({songId: index}));

        this.player.play().then(console.log);
    }

    updateProgress() {

        if (this.player.currentTime > 0) {

            this.progressValue = (this.player.currentTime / this.player.duration) * 100;

            let seconds = this.player.duration.toFixed(0);
            let duration = this.secondsToString(seconds);
            let currentSeconds = this.player.currentTime.toFixed(0);
            let actual = this.secondsToString(currentSeconds);

            document.getElementById('timer').innerText = actual + ' / ' + duration;
        }
    }

    secondsToString(seconds) {
        let hour: string | number = '';
        if (seconds > 3600) {
            hour = Math.floor(seconds / 3600);
            hour = (hour < 10) ? '0' + hour : hour;
            hour += ':';
        }
        let minute: string | number = Math.floor((seconds / 60) % 60);
        minute = (minute < 10) ? '0' + minute : minute;
        let second: string | number = seconds % 60;
        second = (second < 10) ? '0' + second : second;
        // @ts-ignore
        return hour + minute + ':' + second;
    }

}
