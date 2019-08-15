import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainLayoutComponent } from 'src/app/layout/main/main-layout.component';
import { AuthenticationGuard } from 'src/app/shared/guards/authentication.guard';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: './modules/dashboard/dashboard.module#DashboardModule',
      },
      {
        path: 'profile',
        loadChildren: './modules/profile/profile.module#ProfileModule',
      },
      {
        path: 'calendar',
        loadChildren: './modules/calendar/calendar.module#CalendarModule',
      },
      {
        path: 'gradebook',
        loadChildren: './modules/gradebook/gradebook.module#GradebookModule',
      },
      {
        path: 'onboard',
        loadChildren: './modules/onboard/onboard.module#OnboardModule',
      }
    ]
  },
  {
    path: 'login',
    loadChildren: './modules/login/login.module#LoginModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
