import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileGuidelineComponent } from './profile-guideline.component';
import { NameComponent } from './name/name.component';
import { BirthdayComponent } from './birthday/birthday.component';
import { GenderComponent } from './gender/gender.component';
import { CountryComponent } from './country/country.component';
import { GradeComponent } from './grade/grade.component';
import { CurrentSchoolComponent } from './current-school/current-school.component';

const routes: Routes = [
  {
    path: '', component: ProfileGuidelineComponent,
    children: [
      { path: '', redirectTo: 'name', pathMatch: 'full' },
      { path: 'name', component: NameComponent },
      { path: 'birthday', component: BirthdayComponent },
      { path: 'gender', component: GenderComponent },
      { path: 'country', component: CountryComponent },
      { path: 'grade', component: GradeComponent },
      { path: 'current-school', component: CurrentSchoolComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileGuidelineRoutingModule {}
