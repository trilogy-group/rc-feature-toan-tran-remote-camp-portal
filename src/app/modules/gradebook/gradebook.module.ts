import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule, MatIconModule, MatButtonModule } from '@angular/material';

import { SharedModule } from 'src/app/shared/shared.module';
import { GradebookRoutingModule } from 'src/app/modules/gradebook/gradebook-routing.module';
import { GradebookComponent } from 'src/app/modules/gradebook/pages/gradebook/gradebook.component';
import { IcDashboardComponent } from 'src/app/modules/gradebook/pages/ic-dashboard/ic-dashboard.component';
import { DashboardModule } from 'src/app/modules/dashboard/dashboard.module';
import { SemCheckInChatsComponent } from 'src/app/modules/gradebook/pages/sem-check-in-chats/sem-check-in-chats.component';
import {
  SemCheckInChatDetailComponent
} from 'src/app/modules/gradebook/components/sem-check-in-chat-detail/sem-check-in-chat-detail.component';

@NgModule({
  declarations: [
    GradebookComponent,
    IcDashboardComponent,
    SemCheckInChatsComponent,
    SemCheckInChatDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    GradebookRoutingModule,
    DashboardModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
  ]
})
export class GradebookModule {}
