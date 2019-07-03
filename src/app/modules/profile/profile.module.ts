import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileRoutingModule } from 'src/app/modules/profile/profile-routing.module';
import { ProfileSettingsComponent } from './pages/profile-settings.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    ProfileSettingsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    MatIconModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule {}
