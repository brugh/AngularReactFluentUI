// import * as React from 'react';
// import * as ReactDOM from 'react-dom';
import { Component, OnChanges, AfterViewInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react';
import { ElementRef } from '@angular/core';
import { render } from 'react-dom';
import { createElement } from 'react';

const ID = '' + Math.random();

@Component({
  selector: 'app-button',
  template: `<span #MyButton class="myStyle"></span>`
})
export class ButtonComponent implements OnChanges, AfterViewInit {
  @ViewChild('MyButton') button: ElementRef;
  @Input() label: string;
  @Input() primary: false;
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
    render(
      createElement(
        this.primary ? PrimaryButton : DefaultButton,
        {
          onClick: () => this.handle,
          className: 'myStyle'
        },
        this.label
      ),
      this.button.nativeElement
    );
  }

  handle = (event) => {
    this.click.emit(event);
  }
}