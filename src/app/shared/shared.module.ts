import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/* our own custom components */
import { DialogComponent } from './dialog/dialog.component';
import { SectionComponent } from './section/section.component';

@NgModule({
  imports: [
    /* angular stuff */
    CommonModule,
    FormsModule
  ],
  declarations: [
    DialogComponent,
    SectionComponent
  ],
  exports: [
    /* angular stuff */
    CommonModule,
    FormsModule,
    /* our own custom components */
    DialogComponent,
    SectionComponent
  ],
  providers: [
  ]
})
export class SharedModule {}