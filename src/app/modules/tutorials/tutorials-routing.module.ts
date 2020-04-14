import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CodingTutorialsComponent } from './pages/coding-tutorials/coding-tutorials.component';

const routes: Routes = [
  {
    path: '',
    component: CodingTutorialsComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TutorialsRoutingModule {}
