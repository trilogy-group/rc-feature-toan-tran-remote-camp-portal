import { MatButtonModule, MatIconModule, MatListModule, MatMenuModule, MatTooltipModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DfSidebarModule, DfHttpLoaderInterceptorModule } from '@devfactory/ngx-df';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { MainLayoutComponent } from 'src/app/layout/main/main-layout.component';
import { AuthenticationGuard } from 'src/app/shared/guards/authentication.guard';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { AccomplishmentsService } from 'src/app/shared/services/accomplishments.service';
import { AuthenticationTokenService } from 'src/app/shared/services/authentication-token.service';
import { AppComponent } from 'src/app/app.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AllHttpInterceptor } from 'src/app/shared/interceptors/all-http.interceptor';
import { ProfileService } from 'src/app/shared/services/profile.service';

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
    AuthenticationGuard,
    AuthenticationService,
    AccomplishmentsService,
    AuthenticationTokenService,
    ProfileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
