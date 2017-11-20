import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

/* our own custom components */
import { AlertComponent } from './alert/alert.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { ProfileGuidelineLayoutComponent } from './profile-guideline-layout/profile-guideline-layout.component';
import { BusinessListComponent } from './business/business-list.component';
import { BusinessItemComponent } from './business/business-item.component';

import { NAV_DROPDOWN_DIRECTIVES } from './app-layout/nav-dropdown.directive';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './app-layout/sidebar.directive';
import { AsideToggleDirective } from './app-layout/aside.directive';

@NgModule({
  imports: [
    /* angular stuff */
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule,
    BsDropdownModule.forRoot()
  ],
  declarations: [
    AlertComponent,
    AppLayoutComponent,
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
    BusinessListComponent,
    BusinessItemComponent,
    ProfileGuidelineLayoutComponent
  ],
  providers: [
  ]
})
export class FeaturesSharedModule {}
