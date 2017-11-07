import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileGuidelineComponent } from './profile-guideline.component';
import { NameComponent } from './name/name.component';
import { CountryComponent } from './country/country.component';
import { IntroductionComponent } from './introduction/introduction.component';

const routes: Routes = [
  {
    path: '', component: ProfileGuidelineComponent,
    children: [
      { path: '', redirectTo: 'name', pathMatch: 'full' },
      { path: 'name', component: NameComponent },
      { path: 'country', component: CountryComponent },
      { path: 'introduction', component: IntroductionComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileGuidelineRoutingModule {}
