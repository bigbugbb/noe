import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AuthGuard } from './guards/auth.guard';
import { UnauthGuard } from './guards/unauth.guard';
import { ProfileGuard } from './guards/profile.guard';
import { AlertService } from './alert/alert.service';
import { UserService } from './api/user/user.service';
import { StudentService } from './api/student/student.service';
import { SchoolService } from './api/school/school.service';
import { CompanyService } from './api/company/company.service';
import { BusinessService } from './api/business/business.service';
import { BusinessDetailService } from './api/business/business-detail.service';
import { OrderService } from './api/order/order.service';
import { OrderDetailService } from './api/order/order-detail.service';
import { OrderActionsService } from './api/order/order-actions.service';
import { ThreadService } from './api/thread/thread.service';
import { MessageService } from './api/message/message.service';
import { ChatService } from './chat/chat.service';
import { ChatUIService } from './chat/chat-ui.service';
import { ProfileService } from './profile/profile.service';
import { StorageService } from './storage/storage.service';
import { S3Service } from './s3/s3.service';
import { ApplyingFileService } from './s3/applying-file.service';
import { ModalModule, BsModalRef, BsModalService } from 'ngx-bootstrap';
import { environment } from '@env/environment';
import * as AWS from 'aws-sdk';

@NgModule({
  imports: [
    HttpModule,
    ModalModule.forRoot()
  ],
  declarations: [
  ],
  providers: [
    AuthGuard,
    UnauthGuard,
    ProfileGuard,
    AlertService,
    UserService,
    ProfileService,
    StudentService,
    SchoolService,
    CompanyService,
    BusinessService,
    BusinessDetailService,
    OrderService,
    OrderDetailService,
    OrderActionsService,
    ThreadService,
    MessageService,
    ChatService,
    ChatUIService,
    StorageService,
    S3Service,
    ApplyingFileService,
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
