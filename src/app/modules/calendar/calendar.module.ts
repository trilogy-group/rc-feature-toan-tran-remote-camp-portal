import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';
import { CalendarRoutingModule } from 'src/app/modules/calendar/calendar-routing.module';
import { CalendarComponent } from 'src/app/modules/calendar/pages/calendar.component';

@NgModule({
  declarations: [
    CalendarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    CalendarRoutingModule
  ],
  exports: []
})
export class CalendarModule {}
