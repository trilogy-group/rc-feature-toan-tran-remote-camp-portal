import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RcaComponent } from './pages/rca/rca.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: RcaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RcaRoutingModule { }
