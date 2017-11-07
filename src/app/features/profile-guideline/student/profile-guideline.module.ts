import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared';
import { ProfileGuidelineRoutingModule } from './profile-guideline.routing';
import { ProfileGuidelineComponent } from './profile-guideline.component';
import { NameComponent } from './name/name.component';
import { BirthdayComponent } from './birthday/birthday.component';
import { GenderComponent } from './gender/gender.component';
import { CountryComponent } from './country/country.component';
import { GradeComponent } from './grade/grade.component';
import { CurrentSchoolComponent } from './current-school/current-school.component';
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
    BirthdayComponent,
    GenderComponent,
    CountryComponent,
    GradeComponent,
    CurrentSchoolComponent
  ]
})
export default class ProfileModule {}
