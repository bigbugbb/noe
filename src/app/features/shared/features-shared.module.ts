import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap';

/* our own custom components */
import { AlertComponent } from './alert/alert.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { AppFooterComponent } from './app-layout/app-footer.component';
import { AppIntroLayoutComponent } from './app-layout/app-intro-layout.component';
import { ThreadListComponent } from './app-layout/thread-list.component';
import { ThreadItemComponent } from './app-layout/thread-item.component';
import { ChatboxComponent } from './app-layout/chatbox.component';
import { ChatboxListComponent } from './app-layout/chatbox-list.component';
import { ChatMessageComponent } from './app-layout/chat-message.component';
import { ProfileGuidelineLayoutComponent } from './profile-guideline-layout/profile-guideline-layout.component';
import { BusinessListComponent } from './business/business-list.component';
import { BusinessItemComponent } from './business/business-item.component';
import { BusinessActionsService } from './business/business-actions.service';

import { NAV_DROPDOWN_DIRECTIVES } from './app-layout/nav-dropdown.directive';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './app-layout/sidebar.directive';
import { AsideToggleDirective } from './app-layout/aside.directive';
import { AppIntroComponent } from '@app/features/app-intro/app-intro.component';

@NgModule({
  imports: [
    /* angular stuff */
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot()
  ],
  declarations: [
    AlertComponent,
    AppLayoutComponent,
    AppIntroLayoutComponent,
    AppFooterComponent,
    ThreadListComponent,
    ThreadItemComponent,
    ChatboxComponent,
    ChatboxListComponent,
    ChatMessageComponent,
    BusinessListComponent,
    BusinessItemComponent,
    ProfileGuidelineLayoutComponent,
    NAV_DROPDOWN_DIRECTIVES,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective
  ],
  exports: [
    /* our own custom components */
    AlertComponent,
    AppLayoutComponent,
    AppIntroLayoutComponent,
    BusinessListComponent,
    BusinessItemComponent,
    ProfileGuidelineLayoutComponent
  ],
  providers: [
    BusinessActionsService
  ]
})
export class FeaturesSharedModule {}
