import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  MatButtonModule, MatButtonToggleModule, MatCheckboxModule, MatDatepickerModule, MatExpansionModule,
  MatIconModule,
  MatInputModule, MatNativeDateModule,
  MatPaginatorModule, MatRadioModule, MatSelectModule,
  MatSortModule,
  MatTableModule,
  MatTooltipModule,
} from '@angular/material';

import { DashboardRoutingModule } from 'src/app/modules/dashboard/dashboard-routing.module';
import { AccomplishmentsComponent } from 'src/app/modules/dashboard/pages/accomplishments/accomplishments.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HardestProblemsTrailingComponent } from 'src/app/modules/dashboard/components/hardest-problems-trailing.component';

@NgModule({
  declarations: [
    AccomplishmentsComponent,
    HardestProblemsTrailingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    DashboardRoutingModule
  ],
  exports: [
    AccomplishmentsComponent
  ]
})
export class DashboardModule {}
