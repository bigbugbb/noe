import { Component, Input, OnInit } from '@angular/core';

import { Business } from '@app/models';

@Component({
  selector: 'noe-business-item',
  templateUrl: './business-item.component.html',
  styleUrls: ['./business-item.component.scss']
})
export class BusinessItemComponent implements OnInit {
  @Input()
  private item: Business;

  @Input()
  private showDivider = true;

  ngOnInit() {}

  public itemLink(item) {
    return `businesses/${item._id}`;
  }

  get name() {
    return `${this.item.name || 'Unknown business name'}`;
  }

  get price() {
    // TODO: format currency type based on the location
    return `$${this.item.price || 'Unknown'}`;
  }
}
