import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpModule } from '@angular/http';

// Guards
import { AuthGuard } from './auth/auth.guard';

// Services
import { AlertService } from './alert/alert.service';
import { UserService } from './user/user.service';

@NgModule({
  imports: [
    HttpModule,
  ],
  declarations: [
  ],
  providers: [
    AuthGuard,
    AlertService,
    UserService
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