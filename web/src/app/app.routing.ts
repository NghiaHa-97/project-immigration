import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import {LoginComponent} from './auth-component/login/login.component';
import {RegisterComponent} from './auth-component/register/register.component';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        loadChildren:
          () => import('./page-component/page-component.module').then(m => m.PageComponentModule)
      },
      {
        path: '',
        loadChildren:
          () => import('./material-component/material.module').then(m => m.MaterialComponentsModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      }
    ]
  }
];
