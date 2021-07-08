// import * as React from 'react';
// import * as ReactDOM from 'react-dom';
import { Component, OnChanges, AfterViewInit, ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { render } from 'react-dom';
import { createElement } from 'react';
import { IPersonaSharedProps, Persona, PersonaPresence, PersonaSize } from 'office-ui-fabric-react';

const examplePersona: IPersonaSharedProps = {
  imageUrl: 'data:image/jpeg;base64,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',
  imageInitials: 'HB',
  text: 'Herco van Brug',
  secondaryText: 'Enterprise architect',
  tertiaryText: 'In a meeting',
  optionalText: 'Available at 4:00pm',
};

@Component({
  selector: 'app-persona',
  template: `<span #MyPersona></span>`,
  styles: ['ms-fontColor-themePrimary { color: red }']
})
export class PersonaComponent implements OnChanges, AfterViewInit {
  @ViewChild('MyPersona') persona: ElementRef;

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
          ...examplePersona,
          size: PersonaSize.size40,
          presence: PersonaPresence.away,
        }
      ),
      this.persona.nativeElement
    );
  }
}