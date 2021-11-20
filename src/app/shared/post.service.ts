import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import {
  FbCreateResponseInterface,
  PostInterface
} from './interfaces/app.interfaces'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<PostInterface[]> {
    return this.http
      .get<PostInterface>(`${environment.fbDbUrl}/posts.json`)
      .pipe(
        map((res: { [key: string]: any }) => {
          return Object.keys(res).map((key: string) => ({
            ...res[key],
            id: key,
            date: new Date(res[key].date)
          }))
        })
      )
  }

  getById(id: string): Observable<PostInterface> {
    return this.http
      .get<PostInterface>(`${environment.fbDbUrl}/posts/${id}.json`)
      .pipe(
        map((post: PostInterface) => {
          return {
            ...post,
            id,
            date: new Date(post.date)
          }
        })
      )
  }

  create(post: PostInterface): Observable<PostInterface> {
    return this.http
      .post<PostInterface | FbCreateResponseInterface>(
        `${environment.fbDbUrl}/posts.json`,
        post
      )
      .pipe(
        map((res: FbCreateResponseInterface) => {
          return {
            ...post,
            id: res.name,
            date: new Date(post.date)
          }
        })
      )
  }

  update(post: PostInterface): Observable<PostInterface> {
    return this.http.patch<PostInterface>(
      `${environment.fbDbUrl}/posts/${post.id}.json`,
      post
    )
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}/posts/${id}.json`)
  }
}
