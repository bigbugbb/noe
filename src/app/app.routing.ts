import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './_guards/auth.guard';
import { AppLayoutComponent } from './_layouts/app-layout.component';
import { AppSimpleLayoutComponent } from './_layouts/app-simple-layout.component';
import { AuthComponent } from './auth';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [AuthGuard],
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
  },  
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { enableTracing: true }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
