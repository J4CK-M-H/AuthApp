import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { environments } from 'src/environments/environments';
import { AuthStatus, LoginResponse } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environments.baseUrl;
  private http = inject(HttpClient);


  private _currentUser = signal<string | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);


  public currentUser = computed(() => this._currentUser())
  public authStatus = computed(() => this._authStatus())

  constructor() {
    this.checkAuthStatus().subscribe();
   }


  private setAuthentication(user: string, token: string): boolean {

    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('token', token);

    return true;
  }

  login(username: string, password: string): Observable<boolean> {

    const url = `${this.baseUrl}`
    const body = { username, password }

    return this.http.post<LoginResponse>(url, body)
      .pipe(
        map(({ tokenType, accessToken }) => this.setAuthentication(accessToken, accessToken)),
        catchError(err => throwError(() => err.error.message))
      );
  }

  checkAuthStatus(): Observable<boolean> {

    const url = `${this.baseUrl}`;
    const token = localStorage.getItem('token');

    if (!token) {
      this.logout();
      return of(false);
    }

    this._currentUser.set(token);
    this._authStatus.set( AuthStatus.authenticated );
    return of(true);
  }

  logout() {
    localStorage.removeItem('token');
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated); 
  }
}
