import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { IPost } from '../../shared/interfaces';
import { PostService } from '../../shared/post.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

  form!: FormGroup

  constructor(
    private postService: PostService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [
        Validators.required
      ]),
      author: new FormControl('', [
        Validators.required
      ]),
      text: new FormControl('', [
        Validators.required
      ])
    })
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return
    }

    const post: IPost = {
      title: this.form.value.title,
      author: this.form.value.author,
      text: this.form.value.text,
      date: new Date()
    }

    this.postService.create(post)
      .subscribe(() => {
        this.form.reset()
        this.router.navigate(['/admin', 'dashboard'])
      })
  }

}
