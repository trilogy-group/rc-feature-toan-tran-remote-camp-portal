import { Component } from '@angular/core';
import { DfToasterService } from '@devfactory/ngx-df/toaster';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DfFileUploader, DfFileUploaderOptions, DfFileUploaderActionOptions } from '@devfactory/ngx-df/file-upload';
import { Router } from '@angular/router';
import { isThursday, startOfWeek, addWeeks, isFriday, isSaturday, isSunday, isWednesday, isTuesday } from 'date-fns';

import { RegistrationService } from 'src/app/shared/services/registration.service';

@Component({
  selector: 'app-engineering-signup',
  templateUrl: './engineering-signup.component.html',
  styleUrls: ['./engineering-signup.component.scss']
})
export class EngineeringSignupComponent {
  // tslint:disable-next-line:max-line-length
  private readonly emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  private readonly fieldRequiredMessage = 'This field is required';
  private readonly invalidEmailFormatMessage = 'Please enter a valid email';

  public readonly qaManualTester = 'QA Manual Tester';

  public selectedRoleName = '';
  public form: FormGroup;
  public roles: any[] = [];
  public rolePrerequisites: any[] = [];
  public loaded = false;

  public contractFileUploader: DfFileUploader;
  public mondays: Date[] = [];

  public showErrors: boolean;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly registrationService: RegistrationService,
    private readonly toasterService: DfToasterService,
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

    this.contractFileUploader = new DfFileUploader(contractOptions);

    this.form = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(this.emailRegex)])],
      GitHubId: [null],
      role: [null, Validators.required],
      requirement1: [false, Validators.required],
      requirement2: [false, Validators.required],
      requirement3: [false, Validators.required],
      requirement4: [false, Validators.required],
      requirement5: [false, Validators.required],
      requirement6: [false, Validators.required],
      requirement7: [false, Validators.required],
      requirement8: [false, Validators.required],
      requirement9: [false, Validators.required],
      requirement10: [false, Validators.required],
      startDate: [null, Validators.required],
      videoUrl: [null, Validators.required]
    });
    this.registrationService.getAvailableRoles()
      .subscribe(roles => {
        this.roles = roles.sort((x, y) => x.name.localeCompare(y.name));
        this.loaded = true;
      });

    this.getNext12Mondays();
  }

  public getRoleSpecificPrerequisites(roleId: number): void {
    this.form.controls.role.setValue(roleId);

    const role = this.roles.find(x => x.id === roleId);
    this.selectedRoleName = role.name;
    this.rolePrerequisites = role.prerequisites;

    if (this.isNonQAManualTesterSelected()) {
      this.form.get('GitHubId').setValidators([Validators.required]);
    } else {
      this.form.get('GitHubId').clearValidators();
      this.form.get('GitHubId').updateValueAndValidity();
    }
  }

  public startDateChange(date: Date): void {
    this.form.controls.startDate.setValue(date);
  }

  public onContractUploadFileEvent(): void {
  }

  public onContractRemoveFileEvent(): void {
    this.contractFileUploader.removeAll();
  }

  public onVideoUploadFileEvent(): void {
  }

  public mandatoryPrerequisitesChecked(): boolean {
    let mandatoryPrerequisitesChecked = true;
    for (let i = 1; i <= 9; i++) {
      mandatoryPrerequisitesChecked = mandatoryPrerequisitesChecked && this.form.get(`requirement${i}`).value;
    }
    return mandatoryPrerequisitesChecked;
  }

  public getEmailErrorMessage(): string {
    if (!this.form.controls.email.valid) {
      return this.form.controls.email.value.trim() === '' ? this.fieldRequiredMessage : this.invalidEmailFormatMessage;
    }
  }

  public isNonQAManualTesterSelected(): boolean {
    return this.selectedRoleName !== '' && this.selectedRoleName !== this.qaManualTester;
  }

  public isSubmitDisabled(): boolean {
    let validForm = this.form.valid;
    for (let i = 1; i <= 10; i++) {
      validForm = validForm && this.form.get(`requirement${i}`).value;
    }

    validForm = validForm && this.contractFileUploader.filesQueue.length > 0;
    if (validForm) {
      this.showErrors = !validForm;
    }

    return !validForm;
  }

  public submit(): void {
    if (this.isSubmitDisabled()) {
      this.showErrors = true;
      return;
    }

    this.registrationService.submit(
        this.form.value,
        this.contractFileUploader.filesQueue[0]
      )
      .subscribe(() => {
        this.router.navigate(['/login']);
        this.toasterService.popSuccess(`You are registered successfully!`);
      }, this.handleError.bind(this));
  }

  private getNext12Mondays(): void {
    let date = new Date();
    date = addWeeks(date, 2);
    for (let i = 0; i < 12; i++) {
      this.mondays.push(startOfWeek(addWeeks(date, 1), { weekStartsOn: 1 }));
      date = addWeeks(date, 1);
    }
  }

  private handleError(error): void {
    let errorMessage = 'Something went wrong';
    if (error && error.error) {
      errorMessage = error.error;
    } else if (error && error.message) {
      errorMessage = error.message;
    }

    this.toasterService.popError(errorMessage);
  }
}
