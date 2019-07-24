import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule, MatIconModule } from '@angular/material';

import { SharedModule } from 'src/app/shared/shared.module';
import { GradebookRoutingModule } from 'src/app/modules/gradebook/gradebook-routing.module';
import { GradebookComponent } from 'src/app/modules/gradebook/pages/gradebook/gradebook.component';
import { IcDashboardComponent } from 'src/app/modules/gradebook/pages/ic-dashboard/ic-dashboard.component';
import { DashboardModule } from 'src/app/modules/dashboard/dashboard.module';

@NgModule({
  declarations: [
    GradebookComponent,
    IcDashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    GradebookRoutingModule,
    DashboardModule,
    MatTooltipModule,
    MatIconModule
  ]
})
export class GradebookModule {}
