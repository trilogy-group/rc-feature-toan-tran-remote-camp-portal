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
import { AutomateToEliminateComponent } from 'src/app/modules/dashboard/pages/automate-to-eliminate/automate-to-eliminate.component';
import { VpDashboardComponent } from 'src/app/modules/dashboard/pages/dashboard-vp/dashboard.component';
import { DashboardComponent } from 'src/app/modules/dashboard/pages/dashboard/dashboard.component';
import { ExtendBootcampComponent } from 'src/app/modules/dashboard/pages/extend-bootcamp/extend-bootcamp.component';
import { InnovationsComponent } from 'src/app/modules/dashboard/pages/innovations/innovations.component';
import { TrackIcComponent } from 'src/app/modules/dashboard/pages/track-ic/track-ic.component';
import { TransferRequestComponent } from 'src/app/modules/dashboard/pages/transfer-request/transfer-request.component';

@NgModule({
  declarations: [
    DashboardComponent,
    TransferRequestComponent,
    AutomateToEliminateComponent,
    InnovationsComponent,
    VpDashboardComponent,
    ExtendBootcampComponent,
    TrackIcComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatTooltipModule,
    MatSortModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatRadioModule,
    MatButtonToggleModule,
    MatSelectModule,

    DashboardRoutingModule
  ],
  exports: []
})
export class DashboardModule {}
