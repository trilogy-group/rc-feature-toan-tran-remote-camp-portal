import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TrainingMaterial } from 'src/app/modules/onboard/models';
import { environment } from 'src/environments/environment';

@Injectable()
export class TrainingMaterialService {
  private readonly GET_WORKSMART_MATERIALS = `${environment.workSmartTrainingsUrl}`;
  private readonly GET_TECHNICAL_MATERIALS = `${environment.technicalTrainingsUrl}`;

  public constructor(private readonly httpClient: HttpClient) { }

  public fetchWorksmartTrainings(): Observable<TrainingMaterial[]> {
    return this.httpClient.get<TrainingMaterial[]>(this.GET_WORKSMART_MATERIALS);
  }

  public fetchTechnicalTrainings(pipeline: string): Observable<TrainingMaterial[]> {
    return this.httpClient.get<TrainingMaterial[]>(`${this.GET_TECHNICAL_MATERIALS}?pipeline-jira-id=${pipeline}`);
  }
}
