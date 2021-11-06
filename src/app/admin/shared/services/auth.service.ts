import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IUser } from '../../../shared/interfaces';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {}

  get token(): string {
    return ''
  }

  onLogin(user: IUser): Observable<any> {
    return this.http.post('', user)
  }

  onLogout(): void {}

  isAuthenticated(): boolean {
    return !!this.token
  }

  private setToken(): void {}

}
