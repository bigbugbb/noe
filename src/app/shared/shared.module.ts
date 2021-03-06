import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

/* our own custom components and pipes */
import { DialogComponent } from './dialog/dialog.component';
import { SectionComponent } from './section/section.component';
import { PaginationComponent } from './pagination/pagination.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';

@NgModule({
  imports: [
    /* angular stuff */
    CommonModule,
    FormsModule,
    RouterModule
  ],
  declarations: [
    DialogComponent,
    SectionComponent,
    PaginationComponent,
    CapitalizePipe,
    SafeHtmlPipe
  ],
  exports: [
    /* angular stuff */
    CommonModule,
    FormsModule,
    /* our own custom components */
    DialogComponent,
    SectionComponent,
    PaginationComponent,
    CapitalizePipe,
    SafeHtmlPipe
  ],
  providers: [
  ]
})
export class SharedModule {}
