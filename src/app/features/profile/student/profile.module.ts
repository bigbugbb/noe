import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared';
import { CKEditorModule } from 'ng2-ckeditor';
import { ProfileRoutingModule } from './profile.routing';
import { ProfileComponent } from './profile.component';
import { AboutMyselfComponent } from './about-myself.component';
import { MyOrdersComponent } from './my-orders.component';
import { OrderListComponent } from './order-list.component';
import { OrderItemComponent } from './order-item.component';
import { OrderDetailComponent } from './order-detail.component';
import { OrderActionService } from './order-action.service';
import { ModalModule, TabsModule, PopoverModule, ProgressbarModule, BsDatepickerModule } from 'ngx-bootstrap';
import { ImageCropperComponent } from 'ng2-img-cropper';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import * as Dialogs from './dialogs';

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
    ProgressbarModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  declarations: [
    ProfileComponent,
    AboutMyselfComponent,
    MyOrdersComponent,
    OrderListComponent,
    OrderItemComponent,
    OrderDetailComponent,
    Dialogs.IntroDialogComponent,
    Dialogs.StdTestScoreDialogComponent,
    Dialogs.SchoolPreferredDialogComponent,
    Dialogs.SkillAddDialogComponent,
    Dialogs.SkillEditDialogComponent,
    Dialogs.InterestAddDialogComponent,
    Dialogs.InterestEditDialogComponent,
    Dialogs.ApplyingFileEditDialogComponent,
    ImageCropperComponent,
    PdfViewerComponent
  ],
  providers: [
    OrderActionService
  ]
})
export default class ProfileModule {}
