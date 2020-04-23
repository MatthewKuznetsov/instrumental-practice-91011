import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-contacts',
  templateUrl: 'contacts.component.html',
  styleUrls: ['contacts.component.scss']
})

export class ContactsComponent {
  constructor(private _authService: AuthService) { }
  signOut() {
    this._authService.signOut();
  }
}