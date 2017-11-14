import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ProfileService, BusinessService } from '@app/core';
import { Business, Company } from '@app/models';

@Component({
  selector: 'noe-business-list',
  templateUrl: './business-list.component.html',
  styleUrls: ['../shared-styles.component.scss', './business-list.component.scss']
})
export class BusinessListComponent implements OnInit {
  @Input()
  private data: Business[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private businessService: BusinessService
  ) {}

  ngOnInit() {}

  public createBusiness() {
    const business: Business = new Business();
    this.profileService.getProfile().subscribe((profile: Company) => business.owner = profile._id);
    this.businessService.create(business).subscribe(model => {
      this.router.navigate(['businesses', `${model._id}`], { relativeTo: this.route });
    });
  }
}
