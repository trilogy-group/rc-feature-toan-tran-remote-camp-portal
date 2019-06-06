import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutomateToEliminateComponent } from 'src/app/modules/dashboard/pages/automate-to-eliminate/automate-to-eliminate.component';
import { VpDashboardComponent } from 'src/app/modules/dashboard/pages/dashboard-vp/dashboard.component';

import { DashboardComponent } from 'src/app/modules/dashboard/pages/dashboard/dashboard.component';
import { ExtendBootcampComponent } from 'src/app/modules/dashboard/pages/extend-bootcamp/extend-bootcamp.component';
import { InnovationsComponent } from 'src/app/modules/dashboard/pages/innovations/innovations.component';
import { TrackIcComponent } from 'src/app/modules/dashboard/pages/track-ic/track-ic.component';
import { TransferRequestComponent } from 'src/app/modules/dashboard/pages/transfer-request/transfer-request.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    pathMatch: 'full'
  },
  {
    path: 'vp-dashboard',
    component: VpDashboardComponent
  },
  {
    path: 'transfer-request',
    component: TransferRequestComponent
  },
  {
    path: 'automate-to-eliminate',
    component: AutomateToEliminateComponent
  },
  {
    path: 'feedback',
    component: InnovationsComponent
  },
  {
    path: 'request-extension',
    component: ExtendBootcampComponent
  },
  {
    path: 'track-ic',
    component: TrackIcComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
