import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { TrainingMaterial } from 'src/app/modules/onboard/models';

@Injectable()
export class TrainingMaterialService {
  private readonly worksmartTrainingsMock: TrainingMaterial[] = [
    {
      name: 'Quality Training',
      trainingUrl: 'http://www.google.com',
      focus: 'Quality',
      type: 'Video',
      duration: '5',
    },
    {
      name: 'Quality Training',
      trainingUrl: 'http://www.google.com',
      focus: 'Quality',
      type: 'Video',
      duration: '5',
    },
    {
      name: 'Quality Training',
      trainingUrl: 'http://www.google.com',
      focus: 'Quality',
      type: 'Video',
      duration: '5',
    },
    {
      name: 'Quality Training',
      trainingUrl: 'http://www.google.com',
      focus: 'Quality',
      type: 'Video',
      duration: '5',
    },
    {
      name: 'Quality Training',
      trainingUrl: 'http://www.google.com',
      focus: 'Quality',
      type: 'Video',
      duration: '5',
    },
    {
      name: 'Quality Training',
      trainingUrl: 'http://www.google.com',
      focus: 'Quality',
      type: 'Video',
      duration: '5',
    },
    {
      name: 'Quality Training',
      trainingUrl: 'http://www.google.com',
      focus: 'Quality',
      type: 'Video',
      duration: '5',
    },
    {
      name: 'Quality Training',
      trainingUrl: 'http://www.google.com',
      focus: 'Quality',
      type: 'Video',
      duration: '5',
    },
    {
      name: 'Quality Training',
      trainingUrl: 'http://www.google.com',
      focus: 'Quality',
      type: 'Video',
      duration: '5',
    },
    {
      name: 'Quality Training',
      trainingUrl: 'http://www.google.com',
      focus: 'Quality',
      type: 'Video',
      duration: '5',
    },
    {
      name: 'Quality Training',
      trainingUrl: 'http://www.google.com',
      focus: 'Quality',
      type: 'Video',
      duration: '5',
    },
    {
      name: 'Productivity Article',
      trainingUrl: 'http://www.google.com',
      focus: 'Productivity',
      type: 'Article',
      duration: '10',
    },
    {
      name: 'Productivity Article',
      trainingUrl: 'http://www.google.com',
      focus: 'Productivity',
      type: 'Article',
      duration: '10',
    },
    {
      name: 'Culture Training',
      trainingUrl: 'http://www.google.com',
      focus: 'Culture',
      type: 'Video',
      duration: '20',
    },
    {
      name: 'Graduate Training',
      trainingUrl: 'http://www.google.com',
      focus: 'Graduate Recording',
      type: 'Video',
      duration: '15',
    },
  ];

  private readonly technicalTrainingsMock = [
    {
      name: 'Kickoff Call - HUT C#',
      trainingUrl: 'http://www.google.com',
      focus: 'Kickoff',
      type: 'Video',
      duration: '15',
    },
    {
      name: 'FAQ Video 1',
      trainingUrl: 'http://www.google.com',
      focus: 'FAQ',
      type: 'Video',
      duration: '5',
    },
    {
      name: 'External Video 1',
      trainingUrl: 'http://www.google.com',
      focus: 'External',
      type: 'Video',
      duration: '2',
    },
  ];

  public fetchWorksmartTrainings(): Observable<TrainingMaterial[]> {
    return of(this.worksmartTrainingsMock);
  }

  public fetchTechnicalTrainings(pipeline: string): Observable<TrainingMaterial[]> {
    return of(this.technicalTrainingsMock);
  }
}
