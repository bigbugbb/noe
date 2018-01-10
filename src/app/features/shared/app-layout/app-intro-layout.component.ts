import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { User } from '@app/models';
import { UserService, ProfileService, AlertService } from '@app/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


@Component({
  selector: 'noe-app-intro-layout',
  templateUrl: './app-intro-layout.component.html',
  styleUrls: ['./app-intro-layout.component.scss']
})
export class AppIntroLayoutComponent {
  private loading = false;
  private modalRef: BsModalRef;
  private config = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false
  };

  constructor(
    private router: Router,
    private userService: UserService,
    private profileService: ProfileService,
    private alertService: AlertService,
    private modalService: BsModalService
  ) {}

  openModal(event, template: TemplateRef<any>) {
    event.preventDefault();
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, this.config, { class: 'gray' })
    );
  }

  signin(form: NgForm) {
    this.loading = true;
    const { email, password } = form.value;
    this.userService.signin(email, password).subscribe((user: User) => {
      this.modalRef.hide();
      this.profileService.setProfile(user.profile);
      this.router.navigate(['/home']);
    }, error => {
      this.alertService.error(error);
      this.loading = false;
    });
  }

  signup(form: NgForm) {
    this.loading = true;
    const { email, password } = form.value;
    const userToCreate = new User(email, password, 'Student');
    this.userService.signup(userToCreate).subscribe((user: User) => {
      this.modalRef.hide();
      this.profileService.setProfile(user.profile);
      this.router.navigate(['/home']);
    }, error => {
      this.alertService.error(error);
      this.loading = false;
    });
  }
}
