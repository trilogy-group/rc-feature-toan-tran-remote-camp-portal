import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OnboardStatusComponent } from './pages/onboard-status/onboard-status.component';

const routes: Routes = [
  {
    path: '',
    component: OnboardStatusComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnboardRoutingModule {}
