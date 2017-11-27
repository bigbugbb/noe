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
import { OrderPriceEditDialogComponent } from './dialogs/order-price-edit-dialog.component';
import { MyBusinessesComponent } from './my-businesses.component';
import { BusinessEditComponent } from './business/business-edit.component';
import { BusinessPreviewComponent } from './business/business-preview.component';
import { BusinessItemComponent } from './business/business-item.component';
import { BusinessListComponent } from './business/business-list.component';
import { CustomerOrdersComponent } from './customer-orders.component';
import { OrderItemComponent } from './order/order-item.component';
import { OrderListComponent } from './order/order-list.component';
import { OrderDetailComponent } from './order/order-detail.component';
import { BusinessInfoEditDialogComponent } from './business/business-info-edit-dialog.component';
import { ModalModule, TabsModule, PopoverModule, BsDatepickerModule } from 'ngx-bootstrap';
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
    PopoverModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  declarations: [
    ProfileComponent,
    IntroDialogComponent,
    OrderPriceEditDialogComponent,
    MyBusinessesComponent,
    BusinessEditComponent,
    BusinessPreviewComponent,
    BusinessItemComponent,
    BusinessListComponent,
    CustomerOrdersComponent,
    OrderItemComponent,
    OrderListComponent,
    OrderDetailComponent,
    ImageCropperComponent,
    BusinessInfoEditDialogComponent,
    PdfViewerComponent
  ],
  providers: [
  ]
})
export default class ProfileModule {}
