import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, Subject, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'

import {
  FbAuthResponseInterface,
  PostInterface,
  UserInterface
} from '../../../shared/interfaces/app.interfaces'
import { environment } from '../../../../environments/environment'
import * as events from 'events'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public error$: Subject<string> = new Subject<string>()

  constructor(private http: HttpClient) {}

  get token(): string | null {
    const expDate = new Date(localStorage.getItem('fb-token-exp') as string)

    if (new Date() > expDate) {
      this.logout()
      return null
    }
    return localStorage.getItem('fb-token')
  }

  login(user: UserInterface): Observable<PostInterface> {
    user.returnSecureToken = true
    return this.http
      .post<PostInterface>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,
        user
      )
      .pipe(
        tap(this.setToken as events),
        catchError(this.handleError.bind(this) as events)
      )
  }

  logout(): void {
    this.setToken(null)
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  private handleError(error: HttpErrorResponse): Observable<ErrorEvent> {
    const { message } = error.error.error

    switch (message) {
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Значение email не найдено')
        break
      case 'INVALID_EMAIL':
        this.error$.next('Неверное значение email')
        break
      case 'INVALID_PASSWORD':
        this.error$.next('Неверное значение пароля')
        break
    }
    return throwError(error)
  }

  private setToken(res: FbAuthResponseInterface | null) {
    if (res) {
      const expDate = new Date(new Date().getTime() + +res.expiresIn * 1000)
      localStorage.setItem('fb-token', res.idToken as string)
      localStorage.setItem('fb-token-exp', expDate.toString())
    } else {
      localStorage.clear()
    }
  }
}
