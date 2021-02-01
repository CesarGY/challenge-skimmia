import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// Angular Fire
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';

// Google
import { GoogleMapsModule } from '@angular/google-maps'

import {MatFormFieldModule} from '@angular/material/form-field';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {AuthComponent} from './components/auth/auth.component';
import {LoginComponent} from './components/auth/login/login.component';
import {RegisterComponent} from './components/auth/register/register.component';
import {PositionComponent} from './components/position/position.component';
import {PlayComponent} from './components/play/play.component';
import {MatInputModule} from '@angular/material/input';
import {MatSliderModule} from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatIconModule} from '@angular/material/icon';

import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {appReducers} from './app.reducer';
import {environment} from '../environments/environment';



@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        NavbarComponent,
        AuthComponent,
        LoginComponent,
        RegisterComponent,
        PlayComponent,
        PositionComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSliderModule,
        MatButtonModule,
        MatListModule,
        MatProgressBarModule,
        MatIconModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        AngularFireAuthModule,
        StoreModule.forRoot(appReducers),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production
        }),
        GoogleMapsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
