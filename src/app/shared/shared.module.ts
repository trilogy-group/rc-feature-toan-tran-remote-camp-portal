import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxDfCustom } from './ngx-custom.module';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    NgxDfCustom,
  ],
  exports: [
    // Modules
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    NgxDfCustom,
  ]
})
export class SharedModule {}
