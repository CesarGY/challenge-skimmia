import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.reducer';
import {Router} from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: 'navbar.component.html'
})
export class NavbarComponent implements OnInit {

    currentUser: User;
    isAuth = false;

    constructor(private authService: AuthService, private router: Router, private store: Store<AppState>) {

    }

    ngOnInit(): void {
        this.store.select('auth').subscribe(({user}) => {
            this.currentUser = user;
        });

        this.authService.isAuth().subscribe(auth => {
            this.isAuth = auth;
        });
    }

    home() {
        this.router.navigate(['/']).then(console.log);
    }

    listSongs() {
        this.router.navigate(['/play']).then(console.log);
    }

    logOut() {

        this.authService.logout().then(data => {
            this.router.navigate(['/']).then(console.log);
        });

    }
}
