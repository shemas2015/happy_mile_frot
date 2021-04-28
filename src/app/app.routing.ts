import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './pages/layouts/admin-layout/admin-layout.component';

const routes: Routes =[
  {
    path: '',
    redirectTo: 'citas',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: './pages/layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    }]
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
