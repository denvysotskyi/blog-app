import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'

import { PostInterface } from '../../shared/interfaces/app.interfaces'
import { PostService } from '../../shared/post.service'
import { AlertService } from '../shared/services/alert.service'

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  postArr: PostInterface[] = []
  postSubscription: Subscription
  deleteSubscription: Subscription
  searchString = ''

  constructor(private postService: PostService, private alert: AlertService) {}

  ngOnInit(): void {
    this.postSubscription = this.postService
      .getAll()
      .subscribe((posts: PostInterface[]) => {
        this.postArr = posts
      })
  }

  onRemove(id: string): void {
    this.deleteSubscription = this.postService.remove(id).subscribe(() => {
      this.postArr = this.postArr.filter(
        (post: PostInterface) => post.id !== id
      )
      this.alert.danger('Пост был удален')
    })
  }

  ngOnDestroy(): void {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe()
    }
    if (this.deleteSubscription) {
      this.deleteSubscription.unsubscribe()
    }
  }
}
