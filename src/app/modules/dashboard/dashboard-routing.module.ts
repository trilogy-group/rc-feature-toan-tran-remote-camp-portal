import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccomplishmentsComponent } from 'src/app/modules/dashboard/pages/accomplishments/accomplishments.component';

const routes: Routes = [
  {
    path: '',
    component: AccomplishmentsComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
