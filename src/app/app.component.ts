import { Component } from '@angular/core';

import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/xml/xml.js';
import 'codemirror/mode/css/css.js';
import 'codemirror/mode/shell/shell.js';
import 'codemirror/addon/scroll/simplescrollbars';
import 'codemirror/addon/merge/merge.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {}
