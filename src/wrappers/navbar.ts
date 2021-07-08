// import * as React from 'react';
// import * as ReactDOM from 'react-dom';
import { Component, OnChanges, AfterViewInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { render } from 'react-dom';
import { createElement } from 'react';
import { AnimationClassNames, CommandBar, getTheme, ICommandBarItemProps, Layer, mergeStyles } from 'office-ui-fabric-react';

const theme = getTheme();
const contentClass = mergeStyles([
  {
    backgroundColor: theme.palette.blueLight,
    color: theme.palette.white,
    lineHeight: '50px',
    padding: '0',
  },
  AnimationClassNames.scaleUpIn100,
]);

@Component({
  selector: 'app-navbar',
  template: `<div #Mynavbar></div>`
})
export class NavbarComponent implements OnChanges, AfterViewInit {
  @ViewChild('Mynavbar') navbar: ElementRef;
  @Input() loggedin = false;
  @Output() profile = new EventEmitter<any>();
  @Output() login = new EventEmitter<any>();
  @Output() logout = new EventEmitter<any>();
  @Output() home = new EventEmitter<any>();

  private hasViewLoaded = false;

  // for ref to 'this'
  _items: ICommandBarItemProps[] = [{
    key: 'home',
    text: 'Home',
    cacheKey: 'myCacheKey', // changing this key will invalidate this item's cache
    iconProps: { iconName: 'Home' },
    onClick: () => this.home.emit()
  }];

  _farItems: ICommandBarItemProps[] = [{
    key: 'profile',
    text: 'Profile',
    disabled: !this.loggedin,
    iconProps: { iconName: 'UserFollowed' },
    onClick: () => this.profile.emit()
  }];

  _loginout: ICommandBarItemProps[] = [{
    key: 'logout',
    text: 'Logout',
    // This needs an ariaLabel since it's icon-only
    ariaLabel: 'Logout',
    iconOnly: true,
    iconProps: { iconName: 'FollowUser' },
    onClick: () => this.logout.emit()
  }, {
    key: 'login',
    text: 'Login',
    // This needs an ariaLabel since it's icon-only
    ariaLabel: 'Login',
    iconOnly: true,
    iconProps: { iconName: 'ProfileSearch' },
    onClick: () => this.login.emit(), 
  }];

  public ngOnChanges() {
    this.renderComponent();
  }

  public ngAfterViewInit() {
    this.hasViewLoaded = true;
    this.renderComponent();
  }

  private renderComponent() {
    if (!this.hasViewLoaded) return;
    this._farItems[0].disabled = this.loggedin;
    render(
      createElement(Layer, {},
        createElement(
          CommandBar,
          {
            items: this._items,
            farItems: this._farItems.concat(this._loginout[(this.loggedin?1:0)]),
            className: contentClass
          }
        ),
      ),
      this.navbar.nativeElement
    );
  }
}