import {Injectable} from '@angular/core';
import 'firebase/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../app.reducer';
import {map} from 'rxjs/operators';
import {User} from '../models/user';
import {setUser, unSetUser} from '../components/auth/auth.actions';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    userSubscription: Subscription;

    constructor(
        public angularFireAuth: AngularFireAuth,
        public firestore: AngularFirestore,
        private store: Store<AppState>
    ) {
    }

    initAuthListener() {

        this.angularFireAuth.authState.subscribe(authUser => {
            if (authUser) {
                this.userSubscription = this.firestore.doc(`${authUser.uid}/user`)
                    .valueChanges().subscribe((user: any) => {
                        const currentUser = User.userFromFirebase(user);
                        this.store.dispatch(setUser({user: currentUser}));
                    });
            } else {
                this.userSubscription?.unsubscribe();
                this.store.dispatch(unSetUser());
            }
        });
    }

    createUser(name: string, email: string, password: string) {
        return this.angularFireAuth.createUserWithEmailAndPassword(email, password);
    }

    setDateUser(user, newUser: User) {
        return this.firestore.doc(`${user.uid}/user`).set({...newUser});
    }

    loginUser(email: string, password: string) {
        return this.angularFireAuth.signInWithEmailAndPassword(email, password);
    }

    logout() {
        return this.angularFireAuth.signOut();
    }

    isAuth() {
        return this.angularFireAuth.authState.pipe(map(firebaseUser => firebaseUser != null));
    }

}
