import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ProfileService } from 'src/app/shared/services/profile.service';
import { DfToasterService } from '@devfactory/ngx-df';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private readonly profileService: ProfileService,
    private readonly formBuilder: FormBuilder,
    private readonly toasterServie: DfToasterService
  ) {
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
    this.profileService.saveProfile(this.form.value).subscribe(() => this.toasterServie.popSuccess('Profile Saved'));
  }
}
