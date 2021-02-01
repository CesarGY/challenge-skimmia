import {Component} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: 'auth.component.html'
})
export class AuthComponent {

    isDefaultForm = true;

    constructor(private authService: AuthService) {

        // this.isActive();
    }

    changeTypeForm(type: string) {

        this.isDefaultForm = type != 'register';

    }

}
