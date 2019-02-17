import { NgModule, NO_ERRORS_SCHEMA, LOCALE_ID } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es-PE';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';

registerLocaleData(localeES, 'es-PE');

@NgModule({
    bootstrap: [AppComponent],
    imports: [NativeScriptModule, AppRoutingModule, LoginModule],
    declarations: [AppComponent],
    providers: [{ provide: LOCALE_ID, useValue: 'es-PE' }],
    schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
