import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    title = 'challenge-skimmia';
    isAuth = false;

    constructor(private authService: AuthService) {
        this.authService.initAuthListener();
    }

    ngOnInit() {
        this.checkAuthentication();
    }

    checkAuthentication() {
        this.authService.isAuth()
            .subscribe(auth => this.isAuth = auth);
    }

}
