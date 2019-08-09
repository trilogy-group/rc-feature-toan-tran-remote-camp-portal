import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DfFileUploader, DfFileUploaderOptions, DfFileUploaderActionOptions } from '@devfactory/ngx-df/file-upload';
import { Router } from '@angular/router';
import { isThursday, startOfWeek, addWeeks, isFriday, isSaturday, isSunday } from 'date-fns';

import { RegistrationService } from 'src/app/shared/services/registration.service';

@Component({
  selector: 'app-engineering-signup',
  templateUrl: './engineering-signup.component.html',
  styleUrls: ['./engineering-signup.component.scss']
})
export class EngineeringSignupComponent {
  // tslint:disable-next-line:max-line-length
  private readonly emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  public form: FormGroup;
  public roles: any[] = [];
  public rolePrerequisites: any[] = [];
  public loaded = false;

  public contractFileUploader: DfFileUploader;
  public videoFileUploader: DfFileUploader;
  public mondays: Date[] = [];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly registrationService: RegistrationService,
    private router: Router,
  ) {
    const contractOptions: DfFileUploaderOptions = {
      fileTable: true,
      actions: true,
      dropZone: true,
      queueMaxLength: 1,
      actionOptions: new DfFileUploaderActionOptions(true),
      dropZoneLabel: 'Upload signed contract here',
      emptyQueueLabel: ' ',
    };
    const videoOptions: DfFileUploaderOptions = {
      fileTable: true,
      actions: true,
      dropZone: true,
      queueMaxLength: 1,
      actionOptions: new DfFileUploaderActionOptions(true),
      dropZoneLabel: 'Record a 30 second video with webcam and audio on and upload it here',
      emptyQueueLabel: ' '
    };
    this.contractFileUploader = new DfFileUploader(contractOptions);
    this.videoFileUploader = new DfFileUploader(videoOptions);

    this.form = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(this.emailRegex)])],
      fullName: ['', Validators.compose([Validators.required, Validators.pattern(/[^\s]+/i)])],
      role: [null, Validators.required],
      requirement1: [null],
      requirement2: [null],
      requirement3: [null],
      requirement4: [null],
      requirement5: [null],
      requirement6: [null],
      requirement7: [null],
      requirement8: [null],
      requirement9: [null],
      requirement10: [null],
      requirement11: [null],
      startDate: [null, Validators.required],

    });
    this.registrationService.getAvailableRoles()
      .subscribe(roles => {
        this.roles = roles;
        this.loaded = true;
      });

    this.getNext12Mondays();
  }

  public getRoleSpecificPrerequisites(roleId: number): void {
    this.form.controls.role.setValue(roleId);
    this.registrationService.getRolePrerequisites(roleId).subscribe(prerequisites => this.rolePrerequisites = prerequisites);
  }

  public startDateChange(date: Date): void {
    this.form.controls.startDate.setValue(date);
  }

  public onContractUploadFileEvent(): void {
  }

  public  onContractRemoveFileEvent(): void {
    this.contractFileUploader.removeAll();
  }

  public onVideoUploadFileEvent(): void {
  }

  public  onVideoRemoveFileEvent(): void {
    this.videoFileUploader.removeAll();
  }

  public isSubmitDisabled(): boolean {
    let validForm = this.form.valid;
    for (let i = 1; i <= 11; i++) {
      validForm = validForm && this.form.get(`requirement${i}`).value;
    }

    return !validForm;
  }

  public submit(): void {
    this.registrationService.submit(this.form.value).subscribe(() => this.router.navigate(['/login']));
  }

  private getNext12Mondays(): void {
    let date = new Date();
    if (isThursday(date) || isFriday(date) || isSaturday(date) || isSunday(date)) {
      date = addWeeks(date, 1);
    }
    for (let i = 0; i < 12; i++) {
      date = addWeeks(date, 1);
      this.mondays.push(startOfWeek(addWeeks(date, 1), { weekStartsOn: 1 }));
    }
  }
}
