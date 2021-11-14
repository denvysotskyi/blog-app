import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { switchMap } from 'rxjs/operators'
import { Subscription } from 'rxjs'

import { PostService } from '../../shared/post.service'
import { AlertService } from '../shared/services/alert.service'
import { IPost } from '../../shared/interfaces'

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {

  form!: FormGroup
  post!: IPost
  isSubmitted = false

  updateSubscription?: Subscription

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.postService.getById(params['id'])
        })
      )
      .subscribe((post: IPost) => {
        this.post = post
        this.form = new FormGroup({
          title: new FormControl(
            post.title,
            Validators.required
          ),
          text: new FormControl(
            post.text,
            Validators.required
          )
        })
      })
  }

  ngOnDestroy(): void {
    if (this.updateSubscription) {
      this.updateSubscription
        .unsubscribe()
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return
    }

    this.isSubmitted = true

    this.updateSubscription = this.postService.update({
      ...this.post,
      title: this.form.value.title,
      text: this.form.value.text
    })
      .subscribe(() => {
        this.form.reset()
        this.router.navigate(['/admin', 'dashboard'])
        this.isSubmitted = false
        this.alert.warning('Пост был обновлен')
      })
  }

}
