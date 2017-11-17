import { Component, EventEmitter, OnInit, OnDestroy } from '@angular/core';

import { ProfileService } from '@app/core';

@Component({
  selector: 'noe-about-myself',
  templateUrl: './about-myself.component.html'
})
export class AboutMyselfComponent implements OnInit, OnDestroy {

  private profile;

  private editing = false;

  constructor(
    private profileService: ProfileService
  ) {}

  ngOnInit() {
    console.log('OnInit');
    this.profileService.getProfile().subscribe(profile => {
      this.profile = profile;
    });
  }

  ngOnDestroy() {
    console.log('OnDestroy');
  }

  onEditAboutMe() {
    this.editing = true;
  }

  onSaveAboutMe() {
    this.profileService.updateProfile('Student', this.profile).subscribe(() => {
      this.editing = false;
    });
  }

  onChange(event) {}

  onReady(event) {}

  onFocus(event) {}

  onBlur(event) {}
}
