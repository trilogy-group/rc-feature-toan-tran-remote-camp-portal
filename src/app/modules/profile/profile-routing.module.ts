import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ProfileSettingsComponent } from 'src/app/modules/profile/pages/profile-settings.component';

const routes: Routes = [
  {
    path: 'settings',
    component: ProfileSettingsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
