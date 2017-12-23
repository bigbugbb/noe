import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import * as _ from 'lodash';
import { Order, Business, User, Jabber, Thread } from '@app/models';
import { OrderDetailService, OrderActionsService, ChatService, StorageService } from '@app/core';
import { environment } from '@env/environment';

@Component({
  selector: 'noe-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss', '../../shared/loading/loading.scss']
})
export class OrderItemComponent implements OnInit, OnDestroy {

  private itemValue: Order;

  private handlingOrderAction = false;

  @Input()
  private showDivider = true;

  @Output()
  private itemChange = new EventEmitter();

  private threads: Thread[] = [];
  private subThreads: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orderDetailService: OrderDetailService,
    private orderActionsService: OrderActionsService,
    private chatService: ChatService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.subThreads = this.chatService.threads$.subscribe((threads: Thread[]) => {
      this.threads = threads;
    });
  }

  ngOnDestroy() {
    this.subThreads.unsubscribe();
  }

  @Input()
  get item() {
    return this.itemValue;
  }

  set item(value) {
    this.itemValue = value;
    this.itemChange.emit(this.itemValue);
  }

  get business() {
    return this.item.business;
  }

  get businessName() {
    return this.item.business.name;
  }

  get orderPrice() {
    return `$${this.item.price}`;
  }

  get businessSummary() {
    return this.item.business.summary;
  }

  get orderStatus() {
    return this.item.status;
  }

  navigateToDetail(event) {
    event.preventDefault();
    this.orderDetailService.setOrder(this.item);
    this.router.navigate(['orders', this.item._id], { relativeTo: this.route });
  }

  showPay() {
    return this.orderStatus === 'created';
  }

  showRefund() {
    return this.orderStatus === 'paid';
  }

  showCancel() {
    return this.orderStatus === 'created';
  }

  private pay() {
    const opened = () => { this.handlingOrderAction = false; };
    const closed = () => { this.handlingOrderAction = false; };
    this.handlingOrderAction = true;
    this.orderActionsService.pay(this.item, opened, closed).then(value => {
      this.item = value['order'];
      this.handlingOrderAction = false;
    }).catch (() => {
      this.handlingOrderAction = false;
    });
  }

  private refund() {
    this.handlingOrderAction = true;
    this.orderActionsService.refund(this.item).then(value => {
      this.item = value['order'];
      this.handlingOrderAction = false;
    }).catch (() => {
      this.handlingOrderAction = false;
    });
  }

  private contact() {
    this.orderActionsService.contact(this.item);
  }

  private cancel() {
    this.handlingOrderAction = true;
    this.orderActionsService.cancel(this.item).then(value => {
      this.item = value['order'];
      this.handlingOrderAction = false;
    }).catch (() => {
      this.handlingOrderAction = false;
    });
  }
}
