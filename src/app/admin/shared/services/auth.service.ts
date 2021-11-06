import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { IFbAuthResponse, IUser } from '../../../shared/interfaces';
import { environment } from '../../../../environments/environment';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {}

  get token(): string | null {

    const expDate = new Date(localStorage.getItem('fb-token-exp') as string)

    if (new Date() > expDate) {
      this.onLogout()
      return null
    }
    return localStorage.getItem('fb-token')
  }

  onLogin(user: IUser): Observable<any> {
    user.returnSecureToken = true
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken as any)
      )
  }

  onLogout(): void {
    this.setToken(null)
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  private setToken(res: IFbAuthResponse | null){
    if (res) {
      const expDate = new Date(new Date().getTime() + +res.expiresIn * 1000)
      localStorage.setItem('fb-token', res.idToken as string)
      localStorage.setItem('fb-token-exp', expDate.toString())
    } else {
      localStorage.clear()
    }
  }

}
