import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/* our own custom components and pipes */
import { DialogComponent } from './dialog/dialog.component';
import { SectionComponent } from './section/section.component';
import { CollapseFilterComponent } from './filter/collapse-filter.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';

@NgModule({
  imports: [
    /* angular stuff */
    CommonModule,
    FormsModule
  ],
  declarations: [
    DialogComponent,
    SectionComponent,
    CollapseFilterComponent,
    CapitalizePipe
  ],
  exports: [
    /* angular stuff */
    CommonModule,
    FormsModule,
    /* our own custom components */
    DialogComponent,
    SectionComponent,
    CollapseFilterComponent,
    CapitalizePipe
  ],
  providers: [
  ]
})
export class SharedModule {}