import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  public form: FormGroup;
  public roles: any[] = [];
  public rolePrerequisites: any[] = [];
  public loaded = false;

  public fileUploader: DfFileUploader;
  public mondays: Date[] = [];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly registrationService: RegistrationService,
    private router: Router,
  ) {
    const options: DfFileUploaderOptions = {
      fileTable: true,
      actions: true,
      dropZone: true,
      queueMaxLength: 1,
      actionOptions: new DfFileUploaderActionOptions(true),
    };
    this.fileUploader = new DfFileUploader(options);

    this.form = this.formBuilder.group({
      email: '',
      fullName: '',
    });
    this.registrationService.getAvailableRoles()
      .subscribe(roles => {
        this.roles = roles;
        this.loaded = true;
      });

    this.getNext12Mondays();
  }

  public getRoleSpecificPrerequisites(roleId: number): void {
    this.registrationService.getRolePrerequisites(roleId).subscribe(prerequisites => this.rolePrerequisites = prerequisites);
  }

  public onUploadFileEvent(): void {
  }

  public  onRemoveFileEvent(): void {
    this.fileUploader.removeAll();
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
