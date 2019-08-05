import { ModuleWithProviders, NgModule } from '@angular/core';
import { DfButtonModule } from '@devfactory/ngx-df/button';
import { DfCoreModule } from '@devfactory/ngx-df/core';
import { DfGridModule } from '@devfactory/ngx-df/grid';
import { DfLabelModule } from '@devfactory/ngx-df/label';
import { DfSidebarModule } from '@devfactory/ngx-df/sidebar';
import { DfTablePaginatorModule } from '@devfactory/ngx-df/table-paginator';
import { DfToasterModule } from '@devfactory/ngx-df/toaster';
import { DfPieModule } from '@devfactory/ngx-df/charts/pie';
import { DfCardModule } from '@devfactory/ngx-df/card';
import { DfToolTipModule } from '@devfactory/ngx-df/tooltip/';
import { DfBarModule } from '@devfactory/ngx-df/charts/bar';
import { DfLineModule } from '@devfactory/ngx-df/charts/line';
import { DfGroupToggleModule } from '@devfactory/ngx-df/group-toggle';
import { DfModalModule } from '@devfactory/ngx-df/modal';
import { DfLoadingSpinnerModule, DfLoadingSpinnerTypes } from '@devfactory/ngx-df/loading-spinner';
import { DfCheckboxModule } from '@devfactory/ngx-df/checkbox';
import { DfAccordionModule } from '@devfactory/ngx-df/accordion';
import { DfFileUploadModule } from '@devfactory/ngx-df/file-upload';
import { DfNumberIncreaseModule } from '@devfactory/ngx-df/number-increase';
import { DfSelectModule } from '@devfactory/ngx-df/select';
import { DfRadioInputModule } from '@devfactory/ngx-df/radio-input';

@NgModule({
  imports: [
    DfLoadingSpinnerModule.forRoot({
      type: DfLoadingSpinnerTypes.SPIN,
      blur: false,
    }),
    DfCardModule.forRoot(),
    DfSidebarModule.forRoot(),
    DfLabelModule.forRoot(),
    DfButtonModule.forRoot(),
    DfToasterModule.forRoot({
      autoCloseTime: 2500,
      hasAutoCloseTime: false,
    }),
    DfGridModule.forRoot(),
    DfTablePaginatorModule.forRoot({
      showExcel: false,
      showPdf: false,
      showItemsPerPage: true,
      itemsPerPageOptions: [15, 25, 50],
    }),
    DfCoreModule,
    DfPieModule.forRoot(),
    DfToolTipModule.forRoot(),
    DfBarModule.forRoot(),
    DfLineModule.forRoot(),
    DfGroupToggleModule.forRoot(),
    DfModalModule.forRoot(),
    DfCheckboxModule.forRoot(),
    DfAccordionModule.forRoot(),
    DfFileUploadModule.forRoot(),
    DfNumberIncreaseModule.forRoot(),
    DfSelectModule.forRoot(),
    DfRadioInputModule.forRoot(),
  ],
  providers: [],
  exports: [
    DfCardModule,
    DfSidebarModule,
    DfLabelModule,
    DfButtonModule,
    DfToasterModule,
    DfGridModule,
    DfTablePaginatorModule,
    DfPieModule,
    DfToolTipModule,
    DfBarModule,
    DfLineModule,
    DfGroupToggleModule,
    DfModalModule,
    DfLoadingSpinnerModule,
    DfCheckboxModule,
    DfAccordionModule,
    DfFileUploadModule,
    DfNumberIncreaseModule,
    DfSelectModule,
    DfRadioInputModule,
  ],
})
export class NgxDfRootModule {}

@NgModule({
  imports: [
    DfCardModule,
    DfSidebarModule,
    DfLabelModule,
    DfButtonModule,
    DfToasterModule,
    DfGridModule,
    DfTablePaginatorModule,
    DfCoreModule,
    DfPieModule,
    DfToolTipModule,
    DfBarModule,
    DfLineModule,
    DfGroupToggleModule,
    DfModalModule,
    DfLoadingSpinnerModule,
    DfCheckboxModule,
    DfAccordionModule,
    DfFileUploadModule,
    DfNumberIncreaseModule,
    DfSelectModule,
    DfRadioInputModule,
  ],
  exports: [
    DfCardModule,
    DfSidebarModule,
    DfLabelModule,
    DfButtonModule,
    DfToasterModule,
    DfGridModule,
    DfTablePaginatorModule,
    DfCoreModule,
    DfPieModule,
    DfToolTipModule,
    DfBarModule,
    DfLineModule,
    DfGroupToggleModule,
    DfModalModule,
    DfLoadingSpinnerModule,
    DfCheckboxModule,
    DfAccordionModule,
    DfFileUploadModule,
    DfNumberIncreaseModule,
    DfSelectModule,
    DfRadioInputModule,
  ],
})
export class NgxDfCustom {
  static forRoot(): ModuleWithProviders {
    return { ngModule: NgxDfRootModule };
  }
}
