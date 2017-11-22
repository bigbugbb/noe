import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared';
import { FeaturesSharedModule } from '@app/features/shared';
import { CKEditorModule } from 'ng2-ckeditor';
import { ProfileRoutingModule } from './profile.routing';
import { ProfileComponent } from './profile.component';
import { IntroDialogComponent } from './dialogs/intro-dialog.component';
import { MyBusinessesComponent } from './my-businesses.component';
import { BusinessEditComponent } from './business/business-edit.component';
import { BusinessItemComponent } from './business/business-item.component';
import { BusinessPreviewComponent } from './business/business-preview.component';
import { OrderListComponent } from './order/order-list.component';
import { BusinessInfoEditDialogComponent } from './business/business-info-edit-dialog.component';
import { ModalModule, TabsModule, PopoverModule, BsDatepickerModule } from 'ngx-bootstrap';
import { ImageCropperComponent } from 'ng2-img-cropper';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

@NgModule({
  imports: [
    HttpModule,
    CommonModule,
    SharedModule,
    FeaturesSharedModule,
    CKEditorModule,
    ReactiveFormsModule,
    ProfileRoutingModule,
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    PopoverModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  declarations: [
    ProfileComponent,
    IntroDialogComponent,
    MyBusinessesComponent,
    BusinessEditComponent,
    BusinessItemComponent,
    BusinessPreviewComponent,
    OrderListComponent,
    ImageCropperComponent,
    BusinessInfoEditDialogComponent,
    PdfViewerComponent
  ],
  providers: [
  ]
})
export default class ProfileModule {}
