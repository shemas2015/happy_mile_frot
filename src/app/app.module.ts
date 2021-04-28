import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './pages/components/components.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { TableListComponent } from './pages/table-list/table-list.component';
import { TypographyComponent } from './pages/typography/typography.component';


import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './pages/layouts/admin-layout/admin-layout.component';
import { CitasComponent } from './pages/citas/citas.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    CitasComponent,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
