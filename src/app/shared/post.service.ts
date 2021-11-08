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

  getAll(): Observable<IPost[]> {
    return this.http.get<IPost>(`${environment.fbDbUrl}/posts.json`)
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

  getById(id: string): Observable<IPost> {
    return this.http.get<IPost>(`${environment.fbDbUrl}/posts/${id}.json`)
      .pipe(
        map((post: IPost) => {
          return {
            ...post,
            id,
            date: new Date(post.date)
          }
        })
      )
  }

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

  update(post: IPost): Observable<IPost> {
    return this.http.patch<IPost>(`${environment.fbDbUrl}/posts/${post.id}.json`, post)
  }

  remove(id?: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}/posts/${id}.json`)
  }

}
