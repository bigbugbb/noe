import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared';
import { ProfileRoutingModule } from './profile.routing';
import { ProfileComponent } from './profile.component';
import { IntroDialogComponent } from './dialogs/intro-dialog.component';
import { ActivityListComponent } from './activities/activity-list.component';
import { ActivityItemComponent } from './activities/activity-item.component';
import { BusinessListComponent } from './businesses/business-list.component';
import { BusinessItemComponent } from './businesses/business-item.component';
import { ModalModule, TabsModule, BsDatepickerModule } from 'ngx-bootstrap';
import { ImageCropperComponent } from 'ng2-img-cropper';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

@NgModule({
  imports: [
    HttpModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    ProfileRoutingModule,
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  declarations: [
    ProfileComponent,
    IntroDialogComponent,
    ActivityListComponent,
    ActivityItemComponent,
    BusinessListComponent,
    BusinessItemComponent,
    ImageCropperComponent,
    PdfViewerComponent
  ]
})
export default class ProfileModule {}
