import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../../../app.reducer';
import {isLoading, stopLoading} from '../../../shared/ui.actions';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {

    formLogin: FormGroup;
    uiSubscription: Subscription;
    loading = false;

    constructor(
        private authService: AuthService,
        private fb: FormBuilder,
        private router: Router,
        private store: Store<AppState>) {
    }

    ngOnInit(): void {
        this.formLogin = this.fb.group({
            email: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });

        this.uiSubscription = this.store.select('ui').subscribe(ui => {
            this.loading = ui.isLoading;
        });
    }

    ngOnDestroy(): void {
        this.uiSubscription.unsubscribe();
    }

    login() {

        if (this.formLogin.invalid) {
            return;
        }

        this.store.dispatch(isLoading());

        const {email, password} = this.formLogin.value;

        this.authService.loginUser(email, password).then(_ => {
            this.store.dispatch(stopLoading());
            this.router.navigate(['/play']).then(console.log);
        }, (err) => {
            console.log(err);
            this.store.dispatch(stopLoading());
        });

    }
}
