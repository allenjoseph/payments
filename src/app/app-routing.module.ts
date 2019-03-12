import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { LoginComponent } from './pages/login/view/login.component';
import { AuthGuard } from './services/auth-guard.service';
import { LoginGuard } from './pages/login/login-guard.service';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full',
    },
    { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
    {
        path: 'home',
        loadChildren: '~/app/pages/home/home.module#HomeModule',
        canLoad: [AuthGuard],
    },
    {
        path: 'payments',
        loadChildren:
            '~/app/pages/payment-list/payment-list.module#PaymentListModule',
        canLoad: [AuthGuard],
    },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
