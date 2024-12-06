import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { GameComponent } from './game/game.component';
import { ResultsComponent } from './results/results.component';
import { sessionGuard } from './session.guard';

export const routes: Routes = [
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "game",
        component: GameComponent,
        canActivate: [sessionGuard]
    },
    {
        path: "results",
        component: ResultsComponent,
        canActivate: [sessionGuard]
    },
    {
        path: "**",
        redirectTo: "login"
    }
];
