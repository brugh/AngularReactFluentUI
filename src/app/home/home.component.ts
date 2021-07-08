import { Component, OnInit } from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { AuthenticationResult, EventMessage, EventType, InteractionStatus } from '@azure/msal-browser';
import { filter } from 'rxjs/operators';
import { DialogType } from 'office-ui-fabric-react/lib/Dialog';

@Component({
  selector: 'app-home',
  template: `
    <div *ngIf="!loginDisplay">
      <p class="welcome">Welcome to the MSAL.js v2 Angular Quickstart!</p>
      <p>This sample demonstrates how to configure MSAL Angular to login, logout, protect a route, and acquire an access
          token for a protected resource such as the Microsoft Graph.</p>
      <p>Please sign-in to see your profile information.</p>
    </div>

    <div *ngIf="loginDisplay">
        <p>Login successful!</p>
        <p>Request your profile information by clicking Profile above.</p>
    </div>

    <div>
      <app-button class="special" (click)="handle($event)" label="test 123"></app-button>
      <app-button primary="true" (click)="handle($event)" label="test 234"></app-button>
      <app-date-picker></app-date-picker>
      <app-picker (selected)="setcolor($event)"></app-picker>
      <app-persona></app-persona>
    </div>

  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loginDisplay = false;
  response = '';

  handle(ev) { console.log(ev); }

  constructor(private authService: MsalService, private msalBroadcastService: MsalBroadcastService) { }

  ngOnInit(): void {
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
      )
      .subscribe((result: EventMessage) => {
        console.log(result);
        const payload = result.payload as AuthenticationResult;
        this.authService.instance.setActiveAccount(payload.account);
      });

    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None)
      )
      .subscribe(() => {
        this.setLoginDisplay();
      })

  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

  setcolor(ev) { console.log(ev);}
}
