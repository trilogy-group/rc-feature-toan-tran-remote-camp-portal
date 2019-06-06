import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule, MatIconModule, MatInputModule, MatTabsModule } from '@angular/material';

import { LoginRoutingModule } from 'src/app/modules/login/login-routing.module';
import { LoginComponent } from 'src/app/modules/login/pages/login/login.component';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    ReactiveFormsModule,

    MatButtonModule,
    MatInputModule,
    MatTabsModule,
    MatCheckboxModule,
    MatIconModule,

    LoginRoutingModule
  ],
  exports: []
})
export class LoginModule {}
