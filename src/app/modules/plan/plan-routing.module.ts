import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IcPlanComponent } from 'src/app/modules/plan/pages/ic-plan/ic-plan.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: IcPlanComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanRoutingModule {}
