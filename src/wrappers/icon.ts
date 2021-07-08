import { Component, OnChanges, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Icon } from 'office-ui-fabric-react';
import { createElement } from 'react';
import { render } from 'react-dom';

@Component({
  selector: 'app-icon',
  template: `
    <div #iconID></div>
  `
})
export class IconComponent implements OnChanges, AfterViewInit {
  @ViewChild('iconID') icon: ElementRef;
  @Input() name: string;
  private hasViewLoaded = false;

  public ngOnChanges() {
    this.renderComponent();
  }

  public ngAfterViewInit() {
    this.hasViewLoaded = true;
    this.renderComponent();
  }

  private renderComponent() {
    if (!this.hasViewLoaded) return;
    render(createElement(Icon,
      {
        iconName: this.name
      }),
      this.icon.nativeElement
    );
  }
}