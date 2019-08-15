import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GradebookComponent } from 'src/app/modules/gradebook/pages/gradebook/gradebook.component';
import { IcDashboardComponent } from 'src/app/modules/gradebook/pages/ic-dashboard/ic-dashboard.component';
import { SemCheckInChatsComponent } from 'src/app/modules/gradebook/pages/sem-check-in-chats/sem-check-in-chats.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: GradebookComponent
  },
  {
    path: 'dashboard',
    component: IcDashboardComponent
  },
  {
    path: 'sem-check-in-chats',
    component: SemCheckInChatsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GradebookRoutingModule {}
