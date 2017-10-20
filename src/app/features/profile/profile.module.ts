import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared';
import { ProfileRoutingModule } from './profile.routing';
import { ProfileComponent } from './profile.component';
import { ModalModule, ProgressbarModule, BsDatepickerModule } from 'ngx-bootstrap';
import { ImageCropperComponent } from 'ng2-img-cropper';
import * as Dialogs from './dialogs';

@NgModule({
  imports: [
    HttpModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    ProfileRoutingModule,
    ModalModule.forRoot(),
    ProgressbarModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  declarations: [
    ProfileComponent,
    Dialogs.IntroDialogComponent,
    Dialogs.StdTestScoreDialogComponent,
    Dialogs.SchoolPreferredDialogComponent,
    Dialogs.SkillAddDialogComponent,
    Dialogs.SkillEditDialogComponent,
    Dialogs.InterestAddDialogComponent,
    Dialogs.InterestEditDialogComponent,
    Dialogs.PassportScanEditDialogComponent,
    Dialogs.ApplyingFileEditDialogComponent,
    ImageCropperComponent
  ]
})
export class ProfileModule {}