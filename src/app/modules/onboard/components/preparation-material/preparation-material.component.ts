import { Component, OnInit, Input } from '@angular/core';
import { forkJoin } from 'rxjs';

import { TrainingMaterialService } from 'src/app/shared/services/training-material.service';
import { TrainingMaterial, TrainingFocus, TrainingType } from 'src/app/modules/onboard/models';

@Component({
  selector: 'app-preparation-material',
  templateUrl: './preparation-material.component.html',
  styleUrls: ['./preparation-material.component.scss']
})
export class PreparationMaterialComponent implements OnInit {
  @Input()
  public moduleId: string;

  public worksmartTrainings: TrainingMaterial[] = [];
  public technicalTrainings: TrainingMaterial[] = [];

  constructor(
    private readonly trainingMaterialService: TrainingMaterialService,
  ) { }

  public ngOnInit(): void {
    const requests = [this.trainingMaterialService.fetchWorksmartTrainings()];
    if (this.moduleId != null) {
      requests.push(this.trainingMaterialService.fetchTechnicalTrainings(this.moduleId));
    }
    forkJoin(requests).subscribe(this.assignTrainings.bind(this));
  }

  public assignTrainings([worksmartTrainings, technicalTrainings]): void {
    this.worksmartTrainings = worksmartTrainings;
    this.technicalTrainings = technicalTrainings;

    this.sortWorkSmartTrainings();

    if (technicalTrainings && technicalTrainings.length > 0) {
      this.sortTechnicalTrainings();
    }
  }

  private sortWorkSmartTrainings(): void {
    this.worksmartTrainings.sort((trainingA, trainingB) =>
      this.computeTrainingFocusWeight(trainingA.focus as TrainingFocus) - this.computeTrainingFocusWeight(trainingB.focus as TrainingFocus)
    );
  }

  private sortTechnicalTrainings(): void {
    this.technicalTrainings.sort((trainingA, trainingB) =>
      this.computeTrainingTypeWeight(trainingA.typeOfTraining as TrainingType) -
      this.computeTrainingTypeWeight(trainingB.typeOfTraining as TrainingType)
    );
  }

  private computeTrainingFocusWeight(trainingFocus: TrainingFocus): number {
    switch (trainingFocus.toLocaleLowerCase()) {
      case TrainingFocus.compliance.toLocaleLowerCase():
        return 0;
      case TrainingFocus.quality.toLocaleLowerCase():
        return 1;
      case TrainingFocus.productivity.toLocaleLowerCase():
        return 2;
      case TrainingFocus.graduateRecording.toLocaleLowerCase():
        return 3;
      default:
        return 4;
    }
  }

  private computeTrainingTypeWeight(trainingType: TrainingType): number {
    switch (trainingType.toLocaleLowerCase()) {
      case TrainingType.kickoff.toLocaleLowerCase():
        return 0;
      case TrainingType.faq.toLocaleLowerCase():
        return 1;
      case TrainingType.external.toLocaleLowerCase():
        return 2;
      default:
        return 3;
    }
  }
}
