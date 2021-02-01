import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {ErrorStateMatcher} from '@angular/material/core';
import {Store} from '@ngrx/store';

import {AppState} from '../../../app.reducer';
import {AuthService} from '../../../services/auth.service';
import {isLoading, stopLoading} from '../../../shared/ui.actions';
import {User} from '../../../models/user';

@Component({
    selector: 'app-register',
    templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit, OnDestroy {

    uiSubscription: Subscription;

    formRegister: FormGroup;
    matcher = new ErrorStateMatcher();
    loading = false;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private store: Store<AppState>
    ) {
    }

    ngOnInit(): void {

        this.setUpForm();

        this.uiSubscription = this.store.select('ui').subscribe(ui => {
            this.loading = ui.isLoading;
        });
    }

    ngOnDestroy(): void {
        this.uiSubscription?.unsubscribe();
    }

    setUpForm() {
        this.formRegister = this.fb.group({
            name: ['', [Validators.required]],
            email: ['', [Validators.email, Validators.required]],
            password: ['', [Validators.required]]
        });
    }


    register() {

        if (this.formRegister.invalid) {
            return;
        }

        this.store.dispatch(isLoading());

        const {name, email, password} = this.formRegister.value;

        this.authService.createUser(name, email, password).then(({user}) => {

            this.authService.setDateUser(user, new User(user.uid, name, user.email)).then(console.log);
            this.store.dispatch(stopLoading());
            this.router.navigate(['/play']).then(console.log);

        }).catch(err => {
            this.store.dispatch(stopLoading());
            console.log(err);
        });
    }

}
