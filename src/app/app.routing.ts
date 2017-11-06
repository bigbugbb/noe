import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@app/core';
import { AppLayoutComponent } from '@app/features/shared';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: './features/auth/auth.module#AuthModule'
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
        loadChildren: './features/home/home.module#HomeModule'
      },
      {
        path: 'profile-student',
        loadChildren: './features/profile-student/profile.module#ProfileModule'
      },
      {
        path: 'profile-school',
        loadChildren: './features/profile-school/profile.module#ProfileModule'
      },
      {
        path: 'profile-company',
        loadChildren: './features/profile-company/profile.module#ProfileModule'
      },
      {
        path: 'students',
        loadChildren: './features/student/student.module#StudentModule'
      },
      {
        path: 'schools',
        loadChildren: './features/school/school.module#SchoolModule'
      },
      {
        path: 'companies',
        loadChildren: './features/company/company.module#CompanyModule'
      },
      {
        path: 'messagings',
        loadChildren: './features/messaging/messaging.module#MessagingModule'
      },
      // account sections
      {
        path: 'settings',
        loadChildren: './features/settings/settings.module#SettingsModule'
      },
      {
        path: 'notifications',
        loadChildren: './features/notifications/notifications.module#NotificationsModule'
      },
      {
        path: 'questions',
        loadChildren: './features/questions/questions.module#QuestionsModule'
      },
      // manage sections
      {
        path: 'payments',
        loadChildren: './features/payments/payments.module#PaymentsModule'
      }
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
