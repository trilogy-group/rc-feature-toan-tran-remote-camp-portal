import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';

@Injectable()
export class GradebookService {
  private gradebookMock = [
    {
      'icName': 'Mahipal Rathore',
      'email': 'mahipal.rathore@aurea.com',
      'pipeline': 'QA Automation Engineer',
      'manager': 'Deniz Yavas',
      'start': '2019/07/01',
      'qualitySummary': { 'approved': 0.935064935064935, 'targetForToday': 0.9 },
      'scoreSummary': { 'approved': 9.625, 'inReview': 0.0, 'inProgress': 1.75, 'targetForToday': 9.0 }
    },
    {
      'icName': 'Anubha Gupta',
      'email': 'anubha.gupta@aurea.com',
      'pipeline': 'QA Automation Engineer',
      'manager': 'Deniz Yavas',
      'start': '2019/07/01',
      'qualitySummary': { 'approved': 0.935064935064935, 'targetForToday': 0.9 },
      'scoreSummary': { 'approved': 9.625, 'inReview': 0.0, 'inProgress': 1.75, 'targetForToday': 9.0 }
    },
    {
      'icName': 'Evgeny Astafev',
      'email': 'evgeny.astafev@aurea.com',
      'pipeline': 'QA Automation Engineer',
      'manager': 'Deniz Yavas',
      'start': '2019/07/01',
      'qualitySummary': { 'approved': 0.935064935064935, 'targetForToday': 0.9 },
      'scoreSummary': { 'approved': 9.625, 'inReview': 0.0, 'inProgress': 1.75, 'targetForToday': 9.0 }
    },
  ];

  public constructor(
    private httpClient: HttpClient
  ) {}

  public getGradebookData(): Observable<any> {
    return of(this.gradebookMock);
  }
}
