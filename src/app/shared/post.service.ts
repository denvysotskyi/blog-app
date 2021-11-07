import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IFbCreateResponse, IPost } from './interfaces';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {}

  create(post: IPost): Observable<IPost> {
    return this.http.post<any>(`${environment.fbDbUrl}/posts.json`, post)
      .pipe(
        map((res: IFbCreateResponse) => {
          return {
            ...post,
            id: res.name,
            date: new Date(post.date)
          }
        })
      )
  }

  getAll(): Observable<IPost[]> {
    return this.http.get<any>(`${environment.fbDbUrl}/posts.json`)
      .pipe(
        map((res: { [ key: string]: any }) => {
          return Object
            .keys(res)
            .map(key => ({
              ...res[key],
                id: key,
                date: new Date(res[key].date)
            }))
        })
      )
  }

  remove(id?: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}/posts/${id}.json`)
  }

}
