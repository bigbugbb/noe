import { Component, OnInit } from '@angular/core';

import { ProfileService } from '@app/core';

@Component({
  selector: 'noe-about-myself',
  templateUrl: './about-myself.component.html'
})
export class AboutMyselfComponent implements OnInit {
  private profile;

  private editing = false;

  constructor(
    private profileService: ProfileService
  ) {}

  ngOnInit() {
    this.profileService.getProfile().subscribe(profile => {
      this.profile = profile;
    });
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
