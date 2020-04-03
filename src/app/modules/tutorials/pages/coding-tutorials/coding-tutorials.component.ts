import { Component, OnInit, ViewChild } from '@angular/core';

import { TutorialInProgress, Tutorial, TutorialStep } from '../../models';
import { TutorialsService } from 'src/app/shared/services/tutorials.service';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { flatMap } from 'rxjs/operators';
import { WorkingPanelComponent } from '../../components/working-panel/working-panel.component';

@Component({
  selector: 'app-coding-tutorials',
  templateUrl: './coding-tutorials.component.html',
  styleUrls: ['./coding-tutorials.component.scss']
})
export class CodingTutorialsComponent implements OnInit {

  public currentStepNumber = 1;

  public loaded = false;

  public tutorial: TutorialInProgress;

  public tutorials: Tutorial[];

  public showAnswer = false;

  public workingCode = '';

  public answerCode = '';

  private readonly workingCodeComment = '// Type your answer here\n\n';

  private readonly answerCodeComment = '// This is a possible answer for the step\n\n';

  constructor(
    private readonly tutorialService: TutorialsService,
    private readonly profileService: ProfileService
  ) { }

  public ngOnInit() {
    this.profileService.getProfile().pipe(
      flatMap((profile) => this.tutorialService.getTutorials(profile.pipelineJiraId))
    ).subscribe(tutorials => this.tutorials = tutorials);
  }

  public startTutorial(id: number) {
    this.tutorialService.startTutorial(id).subscribe(tutorial => {
      this.tutorial = tutorial;
      if (tutorial.currentStep) {
        if (tutorial.currentStep.code) {
          this.workingCode = this.workingCodeComment + tutorial.currentStep.code;
        }

        this.updatePanelInfo(tutorial.currentStep);
      }
      this.loaded = true;
    });
  }

  public goBack() {
    this.loaded = false;
    this.tutorialService.getTutorialStep(this.tutorial.id, this.currentStepNumber - 1)
      .subscribe(currentStep => {
        this.currentStepNumber--;
        this.tutorial.currentStep = currentStep;
        this.showAnswer = false;
        this.updatePanelInfo(currentStep);
        this.loaded = true;
      });
  }

  public toggleAnswer() {
    this.showAnswer = !this.showAnswer;
  }

  public getSwitchButtonTooltip() {
    return this.showAnswer ?  'Go back to my solution' : 'Show me an answer!';
  }

  public getSwitchButtonIcon() {
    return this.showAnswer ? 'reply' : 'help_outline';
  }

  public updateWorkingCode(workingCode: string) {
    this.workingCode = workingCode;
  }

  public goNext() {
    this.loaded = false;
    this.tutorialService.getTutorialStep(this.tutorial.id, this.currentStepNumber + 1)
      .subscribe(currentStep => {
        this.currentStepNumber++;
        this.tutorial.currentStep = currentStep;
        this.showAnswer = false;
        this.updatePanelInfo(currentStep);
        this.loaded = true;
      });
  }

  public isBackDisabled() {
    if (!this.tutorial) {
      return true;
    }

    return this.currentStepNumber <= 1;
  }

  public isNextDisabled() {
    if (!this.tutorial) {
      return true;
    }

    return this.currentStepNumber >= this.tutorial.totalSteps;
  }

  private updatePanelInfo(tutorialStep: TutorialStep) {
    if (tutorialStep.answer) {
      this.answerCode = this.answerCodeComment + tutorialStep.answer;
    }
  }
}
