import { MatButtonModule, MatIconModule, MatListModule, MatMenuModule, MatTooltipModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DfSidebarModule, DfHttpLoaderInterceptorModule, DfFileUploadService, DF_ERROR_STATE_MATCHER } from '@devfactory/ngx-df';
import { LayoutModule } from '@angular/cdk/layout';
import { OverlayModule } from '@angular/cdk/overlay';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { MainLayoutComponent } from 'src/app/layout/main/main-layout.component';
import { AuthenticationGuard } from 'src/app/shared/guards/authentication.guard';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { AccomplishmentsService } from 'src/app/shared/services/accomplishments.service';
import { AuthenticationTokenService } from 'src/app/shared/services/authentication-token.service';
import { AppComponent } from 'src/app/app.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CalendarService } from 'src/app/shared/services/calendar.service';
import { AllHttpInterceptor } from 'src/app/shared/interceptors/all-http.interceptor';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { GradebookService } from 'src/app/shared/services/gradebook.service';
import { RegistrationService } from 'src/app/shared/services/registration.service';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule,
    MatListModule,
    DfSidebarModule,
    AppRoutingModule,
    SharedModule,
    LayoutModule,
    OverlayModule,
    HttpClientModule,
    HttpClientModule,
    DfHttpLoaderInterceptorModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AllHttpInterceptor,
      multi: true,
    },
    { provide: DF_ERROR_STATE_MATCHER, useValue: DF_ERROR_STATE_MATCHER },
    AuthenticationGuard,
    AuthenticationService,
    AccomplishmentsService,
    AuthenticationTokenService,
    ProfileService,
    DfFileUploadService,
    CalendarService,
    AuthenticationTokenService,
    GradebookService,
    RegistrationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
