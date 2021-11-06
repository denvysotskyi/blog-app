import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { IUser } from '../../shared/interfaces';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form!: FormGroup
  isSubmitted = false
  message?: string

  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.route.queryParams
      .subscribe((params: Params) => {
        if (params['loginAgain']) {
          this.message = 'Пожалуйста, введите данные'
        }
      })


    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    })
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return
    }

    this.isSubmitted = true

    const user: IUser = {
      email: this.form.value.email,
      password: this.form.value.password
    }

    this.auth.onLogin(user)
      .subscribe(() => {
        this.form.reset()
        this.router.navigate(['/admin', 'dashboard'])
        this.isSubmitted = false
      }, () => {
        this.isSubmitted = false
      })
  }

}
