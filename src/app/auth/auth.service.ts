import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LocalStorageService } from '../local-storage.service';
import { Router } from '@angular/router';
import { baseURL } from '../data/config';

export interface IUser {
  id: string;
  name: string;
  login: string;
  token: string;
}

//
// TODO Normal signUp & logIn result from methods (not just boolean);
//

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(
    private _http: HttpClient,
    private _localStorageService: LocalStorageService,
    private _router: Router
  ) {
    const userFromLS = _localStorageService.get('instr-user')
    if (userFromLS) {
      this.isLoggedIn = true;
      this._user = JSON.parse(userFromLS);
    }
  }

  private _user: IUser;
  get user() {
    return { ...this._user }
  }
  isLoggedIn = false;

  logIn$(
    login: string,
    password: string
  ): Observable<boolean> {
    return this._http.post(
      `${baseURL}auth`,
      { login, password },
      { observe: 'response' }
    ).pipe(
      catchError(err => {
        console.error(err);
        return of(undefined);
      }),
      map(res => {
        if (!res) { return false; }
        const token = res.headers.get('authorization');
        if (!token) { return false; }
        this._user = {
          id: res.body.key,
          login: res.body.login,
          name: res.body.name,
          token
        }
        this._localStorageService.set('instr-user', JSON.stringify(this._user))
        this.isLoggedIn = res.ok;
        return res.ok;
      })
    )
  }

  signUp$(
    login: string,
    password: string,
    name: string
  ) {
    return this._http.post(
      `${baseURL}signup`,
      { login, password, name },
      { observe: 'response' }
    ).pipe(
      catchError(err => {
        console.error(err);
        return of(undefined);
      }),
      map(res => {
        if (!res) { return false; }
        const token = res.headers.get('authorization');
        if (!token) { return false; }
        this._user = {
          id: res.body.key,
          login: res.body.login,
          name: res.body.name,
          token
        }
        this._localStorageService.set('instr-user', JSON.stringify(this._user))
        this.isLoggedIn = res.ok;
        return res.ok;
      })
    )
  }

  signOut() {
    this._user = undefined;
    this.isLoggedIn = false;
    this._localStorageService.set('instr-user', '');
    this._router.navigate(['/login']);
  }

}