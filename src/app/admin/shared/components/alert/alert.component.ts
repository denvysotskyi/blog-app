import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'

import { AlertService } from '../../services/alert.service'
import { AlertInterface } from '../../../../shared/interfaces/app.interfaces'

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {
  @Input() delay = 3000

  public text = ''
  public type = ''

  alertSubscription?: Subscription

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.alertSubscription = this.alertService.alert$.subscribe(
      (alert: AlertInterface) => {
        this.text = alert.text
        this.type = alert.type

        const timeout = setTimeout(() => {
          clearTimeout(timeout)
          this.text = ''
        }, this.delay)
      }
    )
  }

  ngOnDestroy(): void {
    if (this.alertSubscription) {
      this.alertSubscription.unsubscribe()
    }
  }
}
