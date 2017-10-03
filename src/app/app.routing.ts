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
      // main sections
      {
        path: 'home',
        loadChildren: './home/home.module#HomeModule'
      },
      {
        path: 'profile',
        loadChildren: './profile/profile.module#ProfileModule'
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
      },
      {
        path: 'messaging',
        loadChildren: './messaging/messaging.module#MessagingModule'
      },
      // account sections
      {
        path: 'settings',
        loadChildren: './settings/settings.module#SettingsModule'
      },
      {
        path: 'notifications',
        loadChildren: './notifications/notifications.module#NotificationsModule'
      },
      {
        path: 'questions',
        loadChildren: './questions/questions.module#QuestionsModule'
      },
      // manage sections
      {
        path: 'payments',
        loadChildren: './payments/payments.module#PaymentsModule'
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
