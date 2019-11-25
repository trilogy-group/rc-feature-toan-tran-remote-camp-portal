import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { SharedModule } from 'src/app/shared/shared.module';
import { OnboardRoutingModule } from 'src/app/modules/onboard/onboard-routing.module';
import { OnboardStatusComponent } from 'src/app/modules/onboard/pages/onboard-status/onboard-status.component';
import { PreparationMaterialComponent } from 'src/app/modules/onboard/components/preparation-material/preparation-material.component';
import { TrainingMaterialGridComponent } from 'src/app/modules/onboard/components/training-material-grid/training-material-grid.component';

@NgModule({
  declarations: [
    OnboardStatusComponent,
    PreparationMaterialComponent,
    TrainingMaterialGridComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    OnboardRoutingModule,
    MatIconModule,
    MatTooltipModule,
  ],
  exports: [
  ]
})
export class OnboardModule {}
