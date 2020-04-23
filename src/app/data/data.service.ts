import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { baseURL } from './config';

@Injectable({providedIn: 'root'})
export class DataService {
  constructor(
    private _http: HttpClient,
    private _authService: AuthService
  ) { }

  getPosts$(): Observable<any[] | undefined> {
    const user = this._authService.user;
    if (!user || !user.token) { return of(undefined) }
    return this._http.get(
      `${baseURL}posts`,
      {
        headers: {
          'Authorization': user.token
        }
      }
    )
    .pipe(
      catchError(err => {
        console.error(err);
        return of(undefined);
      })
    )
  }

  addPost$(tytle: string, text: string) {
    const user = this._authService.user;
    if (!user || !user.token) { return of(undefined) }
    return this._http.post(
      `${baseURL}add/post`,
      { tytle, text },
      {
        headers: {
          'Authorization': user.token
        }
      }
    ).pipe(
      catchError(err => {
        console.error(err);
        return of(undefined);
      }),
      map(data => {
        if (!data) { return false; }
        return !!data;
      })
    )
  }

}