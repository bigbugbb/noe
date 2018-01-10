import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { User } from '@app/models';
import { UserService, ProfileService, AlertService } from '@app/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import * as _ from 'lodash';
import { Subject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

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
    private modalService: BsModalService
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
      this.onUserSignedInSuccess.bind(this),
      this.onUserSignedInFailed.bind(this)
    );
  }

  signup(form: NgForm) {
    this.loading = true;
    const { email, password } = form.value;
    const userCreating = new User(email, password, 'Student');
    this.userService.signup(userCreating).subscribe(
      this.onUserSignedUpSuccess.bind(this),
      this.onUserSignedUpFailed.bind(this)
    );
  }

  signupWithFacebook() {
    const getMyData = () => {
      const subject = new Subject<any>();
      FB.api('/me', {
        locale: 'en_US',
        fields: 'name, first_name, last_name, email'
      }, (data) => {
        const { id, email, name, first_name, last_name } = data;
        subject.next({
          email,
          name,
          facebookUserID: id,
          firstname: first_name,
          lastname: last_name
        });
        subject.complete();
      });
      return subject.asObservable();
    };

    const getMyPicture = () => {
      const subject = new Subject<any>();
      FB.api('/me/picture?width=200&height=200', function (data) {
        subject.next({ avatar: data.data.url });
        subject.complete();
      });
      return subject.asObservable();
    };

    const onSignup = (response?) => {
      const myData$ = getMyData();
      const myPicture$ = getMyPicture();
      Observable.forkJoin(myData$, myPicture$).map((result) => {
        const data = result[0];
        return _.assign(data, result[1]);
      }).flatMap((data) => {
        return this.userService.signupWithFacebook(data).toPromise();
      }).subscribe((user: User) => {
        console.log(user);
        // this.modalRef.hide();
        // this.profileService.setProfile(user.profile);
        // this.router.navigateByUrl(this.returnUrl);
      }, (error) => {
        // this.alertService.error(error);
        // this.loading = false;
      });
    };

    FB.getLoginStatus((response) => {
      if (response.status === 'connected') {
        onSignup(response);
      } else {
        FB.login(onSignup, { scope: 'public_profile,email' });
      }
    });
  }

  signinWithFacebook() {
    const onLogin = (response) => {
      const { userID } = response.authResponse;
      this.userService.signinWithFacebook(userID).subscribe(
        this.onUserSignedInSuccess.bind(this),
        this.onUserSignedInFailed.bind(this)
      );
    };

    FB.getLoginStatus((response) => {
      if (response.status === 'connected') {
        onLogin(response);
      } else {
        FB.login((loginResponse) => onLogin(loginResponse));
      }
    });
  }

  signupWithGoogle() {

  }

  signinWithGoogle() {

  }

  private onUserSignedInSuccess(user: User) {
    this.modalRef.hide();
    this.profileService.setProfile(user.profile);
    this.router.navigateByUrl(this.returnUrl);
  }

  private onUserSignedInFailed(error) {
    this.alertService.error(error);
    this.loading = false;
  }

  private onUserSignedUpSuccess(user: User) {
    this.modalRef.hide();
    this.profileService.setProfile(user.profile);
    this.router.navigateByUrl(this.returnUrl);
  }

  private onUserSignedUpFailed(error) {
    this.alertService.error(error);
    this.loading = false;
  }
}
