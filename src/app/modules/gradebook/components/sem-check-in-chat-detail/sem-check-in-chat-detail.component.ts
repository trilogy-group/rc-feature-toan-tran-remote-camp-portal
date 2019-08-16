import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sem-check-in-chat-detail',
  templateUrl: './sem-check-in-chat-detail.component.html',
  styleUrls: ['./sem-check-in-chat-detail.component.scss']
})
export class SemCheckInChatDetailComponent implements OnInit {
  public form: FormGroup;
  private isReadOnly: boolean;
  @Input()
  public data: any;

  @Output()
  public cancel = new EventEmitter();

  @Output()
  public save = new EventEmitter<any>();

  constructor(
    private readonly formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      coachedOn: '',
      coachingComments: ''
    });
  }

  public ngOnInit(): void {
    this.form.controls.coachedOn.setValue(this.data.coachedOn ? this.data.coachedOn : 'productivity');
    this.form.controls.coachingComments.setValue(this.data.coachingComments ? this.data.coachingComments : '');
    this.isReadOnly = this.data.isReadOnly;
  }

  public saveCheckInChat(): void {
    this.save.emit({
      week: this.data.week,
      day: this.data.day,
      ... this.form.value
    });
  }

  public cancelCheckInChat(): void {
    this.cancel.emit();
  }

  public isDisabled(): boolean {
    return this.isReadOnly;
  }
}
