import { Component, ViewChild, ElementRef, Input, OnInit } from '@angular/core';
import * as CodeMirror from 'codemirror';

@Component({
  selector: 'app-source-code-panel',
  templateUrl: './source-code-panel.component.html',
  styleUrls: ['./source-code-panel.component.scss']
})
export class SourceCodePanelComponent implements OnInit {

  @ViewChild('textArea')
  public textArea: ElementRef;
  public codeMirror: CodeMirror.EditorFromTextArea;

  @Input()
  public sourceCode = '';

  private options = {
    lineNumbers: true,
    readOnly: true,
    mode: 'javascript',
    theme: 'lesser-dark',
    viewportMargin: Infinity,
    scrollbarStyle: 'simple'
  };

  public ngOnInit(): void {
    if (this.textArea) {
      this.codeMirror = CodeMirror.fromTextArea(this.textArea.nativeElement, this.options);
      this.codeMirror.getDoc().setValue(this.sourceCode);
      this.codeMirror.refresh();
    }
  }
}
