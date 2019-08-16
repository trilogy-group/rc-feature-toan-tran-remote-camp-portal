import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EngineeringSignupComponent } from 'src/app/modules/registration/pages/engineering/engineering-signup.component';

const routes: Routes = [
  {
    path: 'engineering',
    pathMatch: 'full',
    component: EngineeringSignupComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule {}
