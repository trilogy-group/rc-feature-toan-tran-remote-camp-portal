import { MatButtonModule, MatIconModule, MatListModule, MatMenuModule, MatTooltipModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { MainLayoutComponent } from 'src/app/layout/main/main-layout.component';
import { AuthenticationGuard } from 'src/app/shared/guards/authentication.guard';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { AccomplishmentsService } from 'src/app/shared/services/accomplishments.service';
import { ApiClientService } from 'src/app/shared/services/api-client.service';
import { AuthenticationTokenService } from 'src/app/shared/services/authentication-token.service';

import { DfSidebarModule, DfHttpLoaderInterceptorModule } from '@devfactory/ngx-df';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

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
    DfHttpLoaderInterceptorModule.forRoot()
  ],
  providers: [
    AuthenticationGuard,
    AuthenticationService,
    AccomplishmentsService,
    ApiClientService,
    AuthenticationTokenService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
