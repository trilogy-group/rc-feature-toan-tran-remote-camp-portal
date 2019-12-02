import { Component, Input } from '@angular/core';

import { TrainingMaterial } from 'src/app/modules/onboard/models/training-material.model';

@Component({
  selector: 'app-training-material-grid',
  templateUrl: './training-material-grid.component.html',
  styleUrls: ['./training-material-grid.component.scss']
})
export class TrainingMaterialGridComponent {
  @Input()
  public header: string;

  @Input()
  public hideFocus = false;

  @Input()
  public trainings: TrainingMaterial[] = [];
}
