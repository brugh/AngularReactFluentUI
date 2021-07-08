import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PersonaPresence } from 'office-ui-fabric-react';

const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me'; // Prod graph endpoint. Uncomment to use.
//const GRAPH_ENDPOINT = 'https://graph.microsoft-ppe.com/v1.0/me';

type ProfileType = {
  givenName?: string,
  surname?: string,
  userPrincipalName?: string,
  id?: string,
  imageUrl?: string | ArrayBuffer
};

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile!: ProfileType;
  photo!: string | ArrayBuffer;
  presence: PersonaPresence = PersonaPresence.away;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.http.get(GRAPH_ENDPOINT)
      .subscribe(profile => {
        this.profile = profile;
        this.http.get(GRAPH_ENDPOINT + '/photos/120X120/$value', { responseType: 'arraybuffer' }).subscribe(photo => {
            this.profile.imageUrl = 'data:text/plain;base64,' + btoa(String.fromCharCode(...new Uint8Array(photo)));
        });
      });
  }
}
