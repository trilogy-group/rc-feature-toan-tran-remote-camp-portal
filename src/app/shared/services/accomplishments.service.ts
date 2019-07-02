import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientService } from './api-client.service';

@Injectable()
export class AccomplishmentsService {
  private GET_PROFILE = 'profile';
  private GET_HARDEST_PROBLEMS = 'ProfileHardestProblems';
  private GET_PROFILE_ACCOMPLISHMENTS = 'ProfileAccomplishments';

  public constructor(
    private apiClient: ApiClientService
  ) {}

  public getAcomplishmentsDailyProgress(): Observable<any> {
    return this.apiClient.get(this.GET_PROFILE_ACCOMPLISHMENTS);
  }

  public getHardestProblems(): Observable<any> {
    return this.apiClient.get(this.GET_HARDEST_PROBLEMS);
  }

  public getProfile(): Observable<any> {
    return this.apiClient.get(this.GET_PROFILE);
  }
}
