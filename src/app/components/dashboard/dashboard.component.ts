import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

    isAuth = false;

    constructor(private authService: AuthService) {
    }

    ngOnInit(): void {
        this.checkAuthentication();
    }

    checkAuthentication() {
        this.authService.isAuth()
            .subscribe(auth => this.isAuth = auth);
    }

}
