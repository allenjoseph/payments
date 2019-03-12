import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { LoginComponent } from './view/login.component';

@NgModule({
    imports: [NativeScriptCommonModule],
    declarations: [LoginComponent],
    exports: [LoginComponent],
    schemas: [NO_ERRORS_SCHEMA],
})
export class LoginModule {}
