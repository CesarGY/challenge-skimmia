import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PlayComponent} from './components/play/play.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent
    },
    {
        path: 'play',
        component: PlayComponent
    },
    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
