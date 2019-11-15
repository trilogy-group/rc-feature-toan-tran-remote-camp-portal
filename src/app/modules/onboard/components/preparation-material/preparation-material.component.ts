import { Component, OnInit, Input } from '@angular/core';
import { forkJoin } from 'rxjs';

import { TrainingMaterialService } from 'src/app/shared/services/training-material.service';
import { TrainingMaterial } from 'src/app/modules/onboard/models/training-material.model';

@Component({
  selector: 'app-preparation-material',
  templateUrl: './preparation-material.component.html',
  styleUrls: ['./preparation-material.component.scss']
})
export class PreparationMaterialComponent implements OnInit {
  @Input()
  public pipeline: string;

  public worksmartTrainings: TrainingMaterial[] = [];
  public technicalTrainings: TrainingMaterial[] = [];

  constructor(
    private readonly trainingMaterialService: TrainingMaterialService,
  ) { }

  public ngOnInit(): void {
    forkJoin(
      this.trainingMaterialService.fetchWorksmartTrainings(),
      this.trainingMaterialService.fetchTechnicalTrainings(this.pipeline)
    ).subscribe(this.assignTrainings.bind(this));
  }

  public assignTrainings([worksmartTrainings, technicalTrainings]): void {
    this.worksmartTrainings = worksmartTrainings;
    this.technicalTrainings = technicalTrainings;
  }
}
