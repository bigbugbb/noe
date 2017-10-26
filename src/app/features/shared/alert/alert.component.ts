import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { AlertService } from '@app/core';

@Component({
  moduleId: module.id,
  selector: 'noe-alert',
  templateUrl: 'alert.component.html'
})
export class AlertComponent implements OnDestroy {
  public message: string;
  private subscription: Subscription;

  constructor(private alertService: AlertService) {
    // subscribe to alert messages
    this.subscription = alertService.getMessage().subscribe(message => { this.message = message; });
  }

  ngOnDestroy(): void {
    // unsubscribe on destroy to prevent memory leaks
    this.subscription.unsubscribe();
  }
}