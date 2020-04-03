import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { tap, delayWhen } from 'rxjs/operators';

import { TutorialStep, TutorialInProgress, Tutorial } from 'src/app/modules/tutorials/models';

import { environment } from 'src/environments/environment';

@Injectable()
export class TutorialsService {

  private static readonly TUTORIALS_URL = `${environment.tutorialsBaseUrl}`;
  private static readonly FILES_FOR_DOWNLOAD = ['answer', 'code', 'description', 'sourceCode'];

  public constructor(private readonly _httpClient: HttpClient) { }

  public getTutorialStep(tutorialId: number, stepNumber: number): Observable<TutorialStep> {
    return this._httpClient.get<TutorialStep>(`${TutorialsService.TUTORIALS_URL}/${tutorialId}/${stepNumber}`)
      .pipe(delayWhen(result => this.downloadDependencies(result)));
  }

  public startTutorial(tutorialId: number): Observable<TutorialInProgress> {
    return this._httpClient.get<TutorialInProgress>(`${TutorialsService.TUTORIALS_URL}/${tutorialId}`)
      .pipe(delayWhen(result => this.downloadDependencies(result.currentStep)));
  }

  public getTutorials(pipeline: number): Observable<Tutorial[]> {
    return this._httpClient.get<Tutorial[]>(TutorialsService.TUTORIALS_URL);
  }

  private downloadDependencies(step): Observable<any> {
    return forkJoin(
      TutorialsService.FILES_FOR_DOWNLOAD
        .filter(file => step[file])
        .map(file =>
          this._httpClient.get(step[file], {
            headers: {
              'X-Disable-Authorization': '',
              'Accept': '*/*'
            },
            responseType: 'text'
          })
          .pipe(
            tap(textContent => step[file] = textContent)
          )
        )
    );
  }

}
