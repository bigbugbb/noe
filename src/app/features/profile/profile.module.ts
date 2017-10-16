import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared';
import { ProfileRoutingModule } from './profile.routing';
import { ProfileComponent } from './profile.component';
import * as Dialogs from './dialogs';
import { ModalModule, BsDatepickerModule } from 'ngx-bootstrap';
import { ImageCropperComponent } from 'ng2-img-cropper';

@NgModule({
  imports: [
    HttpModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    ProfileRoutingModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  declarations: [
    ProfileComponent,
    Dialogs.IntroDialogComponent,
    Dialogs.SchoolPreferredDialogComponent,
    Dialogs.SkillAddDialogComponent,
    Dialogs.SkillEditDialogComponent,
    Dialogs.InterestAddDialogComponent,
    Dialogs.InterestEditDialogComponent,
    ImageCropperComponent
  ]
})
export class ProfileModule {}