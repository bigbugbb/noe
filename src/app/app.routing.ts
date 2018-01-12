import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard, UnauthGuard, ProfileGuard } from '@app/core';
import {
  AppLayoutComponent,
  AppIntroLayoutComponent,
  ProfileGuidelineLayoutComponent
} from '@app/features/shared';

export const routes: Routes = [
  {
    path: '',
    component: AppIntroLayoutComponent,
    canActivate: [UnauthGuard],
    children: [
      {
        path: '',
        loadChildren: '@app/features/app-intro/app-intro.module#AppIntroModule'
      }
    ]
  },
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [AuthGuard, ProfileGuard],
    children: [
      // main sections
      {
        path: 'home',
        loadChildren: '@app/features/home/home.module#HomeModule'
      },
      {
        path: 'profile/student',
        loadChildren: '@app/features/profile/student/profile.module'
      },
      {
        path: 'profile/school',
        loadChildren: '@app/features/profile/school/profile.module'
      },
      {
        path: 'profile/company',
        loadChildren: '@app/features/profile/company/profile.module'
      },
      {
        path: 'students',
        loadChildren: '@app/features/student/student.module#StudentModule'
      },
      {
        path: 'schools',
        loadChildren: '@app/features/school/school.module#SchoolModule'
      },
      {
        path: 'services',
        loadChildren: '@app/features/business/business.module.ts#BusinessModule'
      },
      // account sections
      {
        path: 'settings',
        loadChildren: '@app/features/settings/settings.module#SettingsModule'
      },
      {
        path: 'notifications',
        loadChildren: '@app/features/notifications/notifications.module#NotificationsModule'
      },
      {
        path: 'questions',
        loadChildren: '@app/features/questions/questions.module#QuestionsModule'
      },
      // manage sections
      {
        path: 'payments',
        loadChildren: '@app/features/payments/payments.module#PaymentsModule'
      }
    ]
  },
  {
    path: 'work-with-us',
    loadChildren: '@app/features/work-with-us/work-with-us.module#WorkWithUsModule'
  },
  {
    path: 'profile-guideline',
    component: ProfileGuidelineLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      // {
      //   path: 'student',
      //   loadChildren: '@app/features/profile-guideline/student/profile-guideline.module'
      // },
      {
        path: 'school',
        loadChildren: '@app/features/profile-guideline/school/profile-guideline.module'
      },
      {
        path: 'company',
        loadChildren: '@app/features/profile-guideline/company/profile-guideline.module'
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(
    routes,
    { enableTracing: false }
  ) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
