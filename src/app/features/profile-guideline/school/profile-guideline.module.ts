import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared';
import { ProfileGuidelineRoutingModule } from './profile-guideline.routing';
import { ProfileGuidelineComponent } from './profile-guideline.component';
import { ModalModule, BsDatepickerModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    HttpModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    ProfileGuidelineRoutingModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  declarations: [
    ProfileGuidelineComponent
  ]
})
export default class ProfileModule {}
