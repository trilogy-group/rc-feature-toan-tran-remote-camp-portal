import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';
import * as CodeMirror from 'codemirror';

@Component({
  selector: 'app-answer-panel',
  templateUrl: './answer-panel.component.html',
  styleUrls: ['./answer-panel.component.scss']
})
export class AnswerPanelComponent implements OnInit {
  @ViewChild('textArea')
  public textArea: ElementRef;

  public codeMirror: CodeMirror.EditorFromTextArea;

  private options = {
    lineNumbers: true,
    readOnly: true,
    mode: 'javascript',
    viewportMargin: Infinity,
    scrollbarStyle: 'simple'
  };

  @Input()
  public answer;

  public ngOnInit(): void {
    if (this.textArea) {
      this.codeMirror = CodeMirror.fromTextArea(this.textArea.nativeElement, this.options);
      this.codeMirror.getDoc().setValue(this.answer);
      this.codeMirror.refresh();
    }
  }
}
