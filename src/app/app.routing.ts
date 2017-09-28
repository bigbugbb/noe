import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppLayoutComponent } from './layouts/app-layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: './home/home.module#HomeModule'
      }, 
      {
        path: 'student',
        loadChildren: './student/student.module#StudentModule'
      },
      {
        path: 'school',
        loadChildren: './school/school.module#SchoolModule'
      },
      {
        path: 'company',
        loadChildren: './company/company.module#CompanyModule'
      }       
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
