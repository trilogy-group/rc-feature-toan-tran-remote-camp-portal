import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatCheckboxModule, MatIconModule, MatInputModule, MatTabsModule} from '@angular/material';

import {LoginRoutingModule} from 'src/app/modules/login/login-routing.module';
import {SignInButtonComponent} from 'src/app/modules/login/components/sign-in-button/sign-in-button.component';
import {LoginComponent} from 'src/app/modules/login/pages/login/login.component';
import {CommonModule} from '@angular/common';


@NgModule({
    declarations: [
        SignInButtonComponent,
        LoginComponent
    ],
    imports: [
        ReactiveFormsModule,

        MatButtonModule,
        MatInputModule,
        MatTabsModule,
        MatCheckboxModule,
        MatIconModule,

        LoginRoutingModule,
        CommonModule
    ],
    exports: []
})
export class LoginModule {
}
