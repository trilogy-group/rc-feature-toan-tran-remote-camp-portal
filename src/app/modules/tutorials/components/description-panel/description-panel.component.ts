import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-description-panel',
  templateUrl: './description-panel.component.html',
  styleUrls: ['./description-panel.component.scss']
})
export class DescriptionPanelComponent {
  @Input()
  public description: string;
}
