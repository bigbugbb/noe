import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpModule } from '@angular/http';

// Guards
import { AuthGuard } from './auth/auth.guard';

// Services
import { AlertService } from './alert/alert.service';
import { UserService } from './api/user/user.service';
import { StudentService } from './api/student/student.service';
import { ProfileService } from './profile/profile.service';
import { StorageService } from './storage/storage.service';
import { ModalModule, BsModalRef, BsModalService } from 'ngx-bootstrap';

@NgModule({
  imports: [
    HttpModule,
    ModalModule.forRoot()
  ],
  declarations: [
  ],
  providers: [
    AuthGuard,
    AlertService,
    UserService,
    ProfileService,
    StudentService,
    StorageService,
    BsModalRef,
    BsModalService
  ]
})
export class CoreModule {
  /* make sure CoreModule is imported only by one NgModule the AppModule */
  constructor (
    @Optional() @SkipSelf() parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}