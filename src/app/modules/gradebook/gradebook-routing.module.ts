import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GradebookComponent } from 'src/app/modules/gradebook/pages/gradebook/gradebook.component';
import { IcDashboardComponent } from 'src/app/modules/gradebook/pages/ic-dashboard/ic-dashboard.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: GradebookComponent
  },
  {
    path: 'dashboard',
    component: IcDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GradebookRoutingModule {}
