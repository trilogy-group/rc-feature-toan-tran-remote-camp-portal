import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatTooltipModule,
} from '@angular/material';

import { SharedModule } from 'src/app/shared/shared.module';
import { CodingTutorialsComponent } from './pages/coding-tutorials/coding-tutorials.component';
import { TutorialsRoutingModule } from './tutorials-routing.module';
import { DescriptionPanelComponent } from './components/description-panel/description-panel.component';
import { WorkingPanelComponent } from './components/working-panel/working-panel.component';
import { AnswerPanelComponent } from './components/answer-panel/answer-panel.component';
import { SourceCodePanelComponent } from './components/source-code-panel/source-code-panel.component';

@NgModule({
  declarations: [
    CodingTutorialsComponent,
    WorkingPanelComponent,
    AnswerPanelComponent,
    DescriptionPanelComponent,
    SourceCodePanelComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    TutorialsRoutingModule
  ],
  exports: [
    CodingTutorialsComponent
  ]
})
export class TutorialsModule {}
