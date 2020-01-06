import { Component } from '@angular/core';
import { DfToasterService } from '@devfactory/ngx-df';
import { finalize, switchMap, takeUntil, tap } from 'rxjs/operators';

import { AdminService } from 'src/app/shared/services/admin.service';
import { timer } from 'rxjs/internal/observable/timer';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  private readonly successMessage = 'Knowledge base refreshed successfully';
  private readonly failureMessage = 'Something went wrong';
  private readonly retriesLimitReachedMessage = 'Exceeded number of retries';
  private readonly RUNNING = 'RUNNING';
  private readonly SUCCEEDED = 'SUCCEEDED';
  private destructor$ = new Subject();
  private retries;
  public refreshingKnowledgeBase = false;
  public readonly waitTime = 3000;
  public readonly maxRetries = 30;
  public readonly refreshKnowledgeBaseTooltip = 'This button refreshes the knowledge base the chatbot uses';

  constructor(
    private readonly adminService: AdminService,
    private readonly toasterService: DfToasterService
  ) {}

  public refreshKnowledgeBase(): void {
    this.refreshingKnowledgeBase = true;
    this.retries = 0;
    this.adminService.refreshKnowledgeBase().pipe(
    ).subscribe(
      statusResponse => {
        this.adminService.getRefreshKnowledgeBaseStatus(statusResponse.executionArn).pipe(
          switchMap(response => timer(0, this.waitTime)),
          switchMap(
            () => this.adminService.getRefreshKnowledgeBaseStatus(statusResponse.executionArn).pipe(
            finalize(() => this.retries += 1)
          )),
          takeUntil(this.destructor$)
        ).subscribe(
          response => {
            if (response.status !== this.RUNNING || this.retries === this.maxRetries) {
              if (response.status === this.SUCCEEDED) {
                this.toasterService.popSuccess(this.successMessage);
              } else if (response.status === this.RUNNING) {
                this.toasterService.popWarning(this.retriesLimitReachedMessage);
              } else {
                this.toasterService.popError(this.failureMessage);
              }

              this.refreshingKnowledgeBase = false;
              this.destructor$.next();
            }
          }, () => this.popError()
        );
      }, () => this.popError()
    );
  }

  private popError() {
    this.refreshingKnowledgeBase = false;
    this.toasterService.popError(this.failureMessage);
  }
}
