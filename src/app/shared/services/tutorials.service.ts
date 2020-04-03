import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { TutorialStep, TutorialInProgress, Tutorial } from 'src/app/modules/tutorials/models';
import {
  formulasListSourceCode,
  formulasListInitialWorkingCode,
  formulasListAnswerCode3,
  formulasListAnswerCode,
  formulasListAnswerCode2
} from './tutorials-mock';
import { delay } from 'rxjs/operators';

@Injectable()
export class TutorialsService {

  private stepsMock = [
    {
      // tslint:disable-next-line:max-line-length
      description: 'Identify the top level functions and / or branches. For each one of them, write a <span class="code">describe</span> block.',
      title: 'Write Top-level "describe" Blocks',
      answer: formulasListAnswerCode,
      sourceCode: formulasListSourceCode,
      code: formulasListInitialWorkingCode
    },
    {
      // tslint:disable-next-line:max-line-length
      description: 'Write as many unit tests in separate <span class="code">it</span> blocks as necessary to cover completely the top level function and / or branches.',
      title: 'Write Child "it" Blocks',
      answer: formulasListAnswerCode2,
      sourceCode: formulasListSourceCode
    },
    {
      // tslint:disable-next-line:max-line-length
      description: 'If the number of blocks is growing too large, consider repeating steps 1 and 2 as many times as necessary to break down a given <span class="code">it</span> block into further <span class="code">describe</span> blocks which will cover specific logic pertaining to nested functions and / or branches. <br> <br>This will help you have your spec file looking neat and tidy while avoiding unnecessary logic to cover the entire source file.',
      title: 'Repeat Steps 1 And 2 If Needed',
      answer: formulasListAnswerCode3,
      sourceCode: formulasListSourceCode
    },
  ] as TutorialStep[];

  private tutorialInProgressMock = {
    id: 1,
    name: 'Structure Unit Tests Based on Coverage',
    totalSteps:  this.stepsMock.length,
    currentStep: this.stepsMock[0]
  } as TutorialInProgress;

  private tutorialMock = {
    id: 1,
    name: 'Structure Unit Tests Based on Coverage',
  } as Tutorial;

  public constructor(private readonly _httpClient: HttpClient) { }

  public getTutorialStep(tutorialId: number, stepNumber: number): Observable<TutorialStep> {
    return of(this.stepsMock[stepNumber - 1]).pipe(delay(100));
  }

  public startTutorial(tutorialId: number): Observable<TutorialInProgress> {
    return of(this.tutorialInProgressMock).pipe(delay(100));
  }

  public getTutorials(pipeline: number): Observable<Tutorial[]> {
    return of([this.tutorialMock]).pipe(delay(100));
  }
}
