import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';
import { RegistrationRoutingModule } from 'src/app/modules/registration/registration-routing.module';
import { EngineeringSignupComponent } from 'src/app/modules/registration/pages/engineering/engineering-signup.component';

@NgModule({
  declarations: [
    EngineeringSignupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RegistrationRoutingModule
  ]
})
export class RegistrationModule {}
