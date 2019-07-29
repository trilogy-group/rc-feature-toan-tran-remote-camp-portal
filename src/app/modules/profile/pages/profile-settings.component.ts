import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import {
  DfToasterService,
  DfFileUploader,
  DfFile,
  DfFileUploaderOptions,
  DfFileUploaderActionOptions,
  DfLoadingSpinnerService
} from '@devfactory/ngx-df';

import { ProfileService } from 'src/app/shared/services/profile.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {
  public fileUploader: DfFileUploader;

  public contractFile: DfFile;

  public form: FormGroup;

  constructor(
    private readonly profileService: ProfileService,
    private readonly formBuilder: FormBuilder,
    private readonly toasterServie: DfToasterService,
    private readonly loadingSpinner: DfLoadingSpinnerService,
  ) {
    const options: DfFileUploaderOptions = {
      fileTable: true,
      actions: true,
      dropZone: true,
      dropZoneLabel: 'Drag file here or click to upload',
      queueMaxLength: 1,
      actionOptions: new DfFileUploaderActionOptions(true),
    };
    this.fileUploader = new DfFileUploader(options);

    this.form = this.formBuilder.group({
      xoId: '',
      jiraId: '',
      companyEmail: '',
      icName: '',
      deckUrl: '',
      tmsUrl: '',
      contractUrl: '',
    });
  }

  public ngOnInit(): void {
    this.profileService.getProfile().subscribe(profile => this.form.patchValue(profile));
  }

  public saveProfile(): void {
    if (
      this.fileUploader && this.fileUploader.filesQueue &&
      this.fileUploader.filesQueue[0] && this.fileUploader.filesQueue[0].file &&
      this.fileUploader.filesQueue[0].file.name
    ) {
      this.form.get('contractUrl').setValue(this.fileUploader.filesQueue[0].file.name);
    }
    this.profileService.saveProfile(
      this.form.value, this.fileUploader.filesQueue[0]
    )
    .pipe(finalize(() => this.loadingSpinner.hide()))
    .subscribe(() => this.toasterServie.popSuccess('Profile Saved'));
  }

  public onUploadFileEvent(): void {
  }

  public  onRemoveFileEvent(): void {
    this.fileUploader.removeAll();
  }
}
