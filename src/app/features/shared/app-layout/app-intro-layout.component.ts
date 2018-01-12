import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { User } from '@app/models';
import { UserService, ProfileService, AlertService } from '@app/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import * as _ from 'lodash';
import { Subject, Observable } from 'rxjs/Rx';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

declare var FB;

@Component({
  selector: 'noe-app-intro-layout',
  templateUrl: './app-intro-layout.component.html',
  styleUrls: ['./app-intro-layout.component.scss']
})
export class AppIntroLayoutComponent implements OnInit {
  private loading = false;
  private returnUrl: string;
  private modalRef: BsModalRef;
  private config = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private profileService: ProfileService,
    private alertService: AlertService,
    private modalService: BsModalService,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

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
    this.userService.signin(email, password).subscribe(
      this.onAuthSuccess.bind(this),
      this.onAuthFailed.bind(this)
    );
  }

  signup(form: NgForm) {
    this.loading = true;
    const { email, password } = form.value;
    const user = new User(email, password, 'Student');
    this.userService.signup(user).subscribe(
      this.onAuthSuccess.bind(this),
      this.onAuthFailed.bind(this)
    );
  }

  async continueWithFacebook() {
    try {
      const provider = new firebase.auth.FacebookAuthProvider();
      const result = await this.afAuth.auth.signInWithPopup(provider);
      this.oauthSignin(result);
    } catch (e) {
      console.log(e);
    }
  }

  async continueWithGoogle() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const result = await this.afAuth.auth.signInWithPopup(provider);
      this.oauthSignin(result);
    } catch (e) {
      console.log(e);
    }
  }

  private oauthSignin(data) {
    this.userService.getCustomIdToken(data.user.uid)
      .flatMap((idToken) => {
        return this.userService.oauthSignin(_.assign(data, idToken));
      })
      .subscribe(
        this.onAuthSuccess.bind(this),
        this.onAuthFailed.bind(this)
      );
  }

  private onAuthSuccess(user: User) {
    this.modalRef.hide();
    this.profileService.setProfile(user.profile);
    window.location.href = this.returnUrl;
  }

  private onAuthFailed(error) {
    this.alertService.error(error);
    this.loading = false;
  }
}
