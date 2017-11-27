import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

import { OrderDetailService } from '@app/core';
import { DialogComponent } from '@app/shared';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

@Component({
  selector: 'noe-order-price-edit-dialog',
  templateUrl: 'order-price-edit-dialog.component.html',
  styleUrls: ['order-price-edit-dialog.component.scss']
})
export class OrderPriceEditDialogComponent implements OnInit {

  @ViewChild('dialog')
  private dialog: DialogComponent;

  public model: any = { price: 0 };

  constructor(
    private orderDetailService: OrderDetailService
  ) {}

  ngOnInit() {
    this.orderDetailService.getOrder().subscribe(value => this.model = value);
  }

  public show() {
    this.dialog.show();
  }

  public onSubmit() {
    this.orderDetailService.updateOrder(this.model).subscribe(value => {
      this.dialog.hide();
    });
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
}
