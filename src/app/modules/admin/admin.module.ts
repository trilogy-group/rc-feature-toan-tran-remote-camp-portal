import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule, MatIconModule, MatButtonModule } from '@angular/material';

import { SharedModule } from 'src/app/shared/shared.module';
import { AdminRoutingModule } from 'src/app/modules/admin/admin-routing.module';
import { AdminComponent } from 'src/app/modules/admin/pages/admin/admin.component';

@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    MatIconModule,
    MatTooltipModule,
    AdminRoutingModule,
    MatButtonModule
  ],
  exports: []
})
export class AdminModule {}
