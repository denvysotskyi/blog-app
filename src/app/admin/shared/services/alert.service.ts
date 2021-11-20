import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { AlertInterface } from '../../../shared/interfaces/app.interfaces'

@Injectable()
export class AlertService {
  public alert$ = new Subject<AlertInterface>()

  success(text: string): void {
    this.alert$.next({
      type: 'success',
      text
    })
  }

  warning(text: string): void {
    this.alert$.next({
      type: 'warning',
      text
    })
  }

  danger(text: string): void {
    this.alert$.next({
      type: 'danger',
      text
    })
  }
}
