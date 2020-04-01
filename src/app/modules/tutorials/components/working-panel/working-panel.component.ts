import { Component, OnInit, ViewChild, ElementRef, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import * as CodeMirror from 'codemirror';

@Component({
  selector: 'app-working-panel',
  templateUrl: './working-panel.component.html',
  styleUrls: ['./working-panel.component.scss']
})
export class WorkingPanelComponent implements OnInit, OnDestroy {
  @ViewChild('textArea')
  public textArea: ElementRef;
  public codeMirror: CodeMirror.EditorFromTextArea;

  @Input()
  public code: '';

  @Output()
  public updateWorkingCode = new EventEmitter<string>();

  private options = {
    lineNumbers: true,
    readOnly: false,
    mode: 'javascript',
    theme: 'lesser-dark',
    viewportMargin: Infinity,
    scrollbarStyle: 'simple'
  };

  public ngOnInit(): void {
    if (this.textArea) {
      this.codeMirror = CodeMirror.fromTextArea(
        this.textArea.nativeElement, this.options);
      this.codeMirror.getDoc().setValue(this.code);
      this.codeMirror.refresh();
    }
  }

  public ngOnDestroy(): void {
    const workingCode = this.codeMirror.getDoc().getValue();
    this.updateWorkingCode.emit(workingCode);
  }
}
