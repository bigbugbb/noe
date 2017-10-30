import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

/* our own custom components and pipes */
import { DialogComponent } from './dialog/dialog.component';
import { SectionComponent } from './section/section.component';
import { PaginationComponent } from './pagination/pagination.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';

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
    CapitalizePipe
  ],
  exports: [
    /* angular stuff */
    CommonModule,
    FormsModule,
    /* our own custom components */
    DialogComponent,
    SectionComponent,
    PaginationComponent,
    CapitalizePipe
  ],
  providers: [
  ]
})
export class SharedModule {}