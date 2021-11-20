import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'

import { PostInterface } from '../shared/interfaces/app.interfaces'
import { PostService } from '../shared/post.service'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  postArr$: Observable<PostInterface[]>

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postArr$ = this.postService.getAll()
  }
}
