// import * as React from 'react';
// import * as ReactDOM from 'react-dom';
import { Component, OnChanges, AfterViewInit, ViewChild, Input } from '@angular/core';
import { ElementRef } from '@angular/core';
import { render } from 'react-dom';
import { createElement } from 'react';
import { Persona, PersonaPresence, PersonaSize } from 'office-ui-fabric-react';

@Component({
  selector: 'app-persona',
  template: `<span #MyPersona></span>`,
  styles: ['ms-fontColor-themePrimary { color: red }']
})
export class PersonaComponent implements OnChanges, AfterViewInit {
  @ViewChild('MyPersona') persona: ElementRef;
  @Input() imageUrl = '';
  @Input() imageInitials = '';
  @Input() text = '';
  @Input() secondaryText = '';
  @Input() tertiaryText = '';
  @Input() optionalText = '';
  @Input() presence: PersonaPresence = PersonaPresence.none

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
        Persona,
        {
          imageUrl: this.imageUrl,
          imageInitials: this.imageInitials,
          text: this.text,
          secondaryText: this.secondaryText,
          tertiaryText: this.tertiaryText,
          optionalText: this.optionalText,
          size: PersonaSize.size120,
          presence: this.presence
        }
      ),
      this.persona.nativeElement
    );
  }
}