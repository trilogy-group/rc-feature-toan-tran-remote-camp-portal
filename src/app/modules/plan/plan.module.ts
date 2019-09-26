import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule, MatIconModule, MatButtonModule } from '@angular/material';

import { SharedModule } from 'src/app/shared/shared.module';
import { PlanRoutingModule } from 'src/app/modules/plan/plan-routing.module';
import { IcPlanComponent } from 'src/app/modules/plan/pages/ic-plan/ic-plan.component';
import { WeeklyPlanComponent } from './components/weekly-plan/weekly-plan.component';

@NgModule({
  declarations: [
    IcPlanComponent,
    WeeklyPlanComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    PlanRoutingModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    WeeklyPlanComponent
  ]
})
export class PlanModule {}
