import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/* our own custom components */
import { SectionComponent } from './section/section.component';

@NgModule({
  imports: [
    /* angular stuff */
    CommonModule,
    FormsModule
  ],
  declarations: [
    SectionComponent
  ],
  exports: [
    /* angular stuff */
    CommonModule,
    FormsModule,
    /* our own custom components */
    SectionComponent
  ]
})
export class SharedModule {}