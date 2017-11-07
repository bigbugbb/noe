import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared';
import { ProfileGuidelineRoutingModule } from './profile-guideline.routing';
import { ProfileGuidelineComponent } from './profile-guideline.component';
import { NameComponent } from './name/name.component';
import { CountryComponent } from './country/country.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { ModalModule, BsDatepickerModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    HttpModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    ProfileGuidelineRoutingModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  declarations: [
    ProfileGuidelineComponent,
    NameComponent,
    CountryComponent,
    IntroductionComponent
  ]
})
export default class ProfileModule {}
