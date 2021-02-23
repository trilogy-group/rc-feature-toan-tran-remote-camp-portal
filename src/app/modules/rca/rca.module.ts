import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatTooltipModule } from '@angular/material';

import { SharedModule } from 'src/app/shared/shared.module';
import { RcaRoutingModule } from './rca-routing.module';
import { RcaComponent } from './pages/rca/rca.component';

@NgModule({
  declarations: [RcaComponent],
  imports: [
    CommonModule,
    SharedModule,
    RcaRoutingModule,
    MatTooltipModule,
    MatIconModule
  ]
})
export class RcaModule { }
