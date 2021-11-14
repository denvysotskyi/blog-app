import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'

import { IPost } from '../../shared/interfaces'
import { PostService } from '../../shared/post.service'
import { AlertService } from '../shared/services/alert.service'

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  postArr: IPost[] = []
  postSubscription?: Subscription
  deleteSubscription?: Subscription
  searchString = ''

  constructor(
    private postService: PostService,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.postSubscription = this.postService.getAll()
      .subscribe(posts => {
        this.postArr = posts
      })
  }

  onRemove(id?: string) {
    this.deleteSubscription = this.postService.remove(id)
      .subscribe(() => {
        this.postArr = this.postArr.filter(post => post.id !== id)
        this.alert.danger('Пост был удален')
      })
  }

  ngOnDestroy(): void {
    if (this.postSubscription) {
      this.postSubscription
        .unsubscribe()
    }
    if (this.deleteSubscription) {
      this.deleteSubscription
        .unsubscribe()
    }
  }

}
