import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Component, OnChanges, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { DatePicker } from 'office-ui-fabric-react';

@Component({
  selector: 'app-date-picker',
  template: `
    <div id="datepickerID">
    </div>
  `
})
export class DatePickerComponent implements OnChanges, AfterViewInit {
  @Input() label: string;
  @Input() primary = false;
  @Output() click = new EventEmitter<string>();

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
    ReactDOM.render(
      React.createElement(DatePicker, {
        onClick: () => { this.click.emit() }
      }),
      document.getElementById('datepickerID')
    );
  }
}