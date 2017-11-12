import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared';
import { CKEditorModule } from 'ng2-ckeditor';
import { ProfileRoutingModule } from './profile.routing';
import { BusinessEditService } from './business/business-edit.service';
import { ProfileComponent } from './profile.component';
import { IntroDialogComponent } from './dialogs/intro-dialog.component';
import { BusinessListComponent } from './business/business-list.component';
import { BusinessItemComponent } from './business/business-item.component';
import { BusinessEditComponent } from './business/business-edit.component';
import { BusinessInfoEditDialogComponent } from './business/business-info-edit-dialog.component';
import { ModalModule, TabsModule, BsDatepickerModule } from 'ngx-bootstrap';
import { ImageCropperComponent } from 'ng2-img-cropper';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

@NgModule({
  imports: [
    HttpModule,
    CommonModule,
    SharedModule,
    CKEditorModule,
    ReactiveFormsModule,
    ProfileRoutingModule,
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  declarations: [
    ProfileComponent,
    IntroDialogComponent,
    BusinessListComponent,
    BusinessItemComponent,
    BusinessEditComponent,
    ImageCropperComponent,
    BusinessInfoEditDialogComponent,
    PdfViewerComponent
  ],
  providers: [
    BusinessEditService
  ]
})
export default class ProfileModule {}
