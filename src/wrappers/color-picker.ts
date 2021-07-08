// import * as React from 'react';
// import * as ReactDOM from 'react-dom';
import { Component, OnChanges, AfterViewInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { render } from 'react-dom';
import { createElement } from 'react';
import { SwatchColorPicker } from 'office-ui-fabric-react';

const colorCellsExample2 = [
  { id: 'a', label: 'red', color: '#a4262c' },
  { id: 'b', label: 'orange', color: '#ca5010' },
  { id: 'c', label: 'orangeYellow', color: '#986f0b' },
  { id: 'd', label: 'yellowGreen', color: '#8cbd18' },
  { id: 'e', label: 'green', color: '#0b6a0b' },
  { id: 'f', label: 'cyan', color: '#038387' },
  { id: 'g', label: 'cyanBlue', color: '#004e8c' },
  { id: 'h', label: 'magenta', color: '#881798' },
  { id: 'i', label: 'magentaPink', color: '#9b0062' },
  { id: 'j', label: 'black', color: '#000000' },
  { id: 'k', label: 'gray', color: '#7a7574' },
  { id: 'l', label: 'gray20', color: '#69797e' },
];

@Component({
  selector: 'app-picker',
  template: `<span #MyPicker class="myStyle"></span>`
})
export class PickerComponent implements OnChanges, AfterViewInit {
  @ViewChild('MyPicker') picker: ElementRef;
  @Output() selected: EventEmitter<any> = new EventEmitter<any>();

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
    render(createElement(
      SwatchColorPicker,
      {
        columnCount: 5,
        cellHeight: 35,
        cellWidth: 35,
        cellShape: 'square',
        colorCells: colorCellsExample2,
        onColorChanged: (id, color) => this.selected.emit({id:id,color:color}),
      }
    ), this.picker.nativeElement );
  }

}