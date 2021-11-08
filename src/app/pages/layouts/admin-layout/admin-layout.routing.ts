import { DoctoresComponent } from './../../doctores/doctores.component';
import { PacientesComponent } from '../../pacientes/pacientes.component';
import { PacienteModel } from './../../../models/Interfaces';

import { AuthGuard } from './../../../guards/auth.guard';
import { LoginComponent } from './../../login/login.component';
import { CitasComponent } from './../../citas/citas.component';
import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { TratamientosComponent } from 'app/pages/tratamientos/tratamientos.component';


export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },

    /*NEWS!**/
    { path: 'login',      component: LoginComponent },
    { path: 'citas',      component: CitasComponent, canActivate: [ AuthGuard ] },
    { path: 'doctores',   component: DoctoresComponent , canActivate: [ AuthGuard ] },
    { path: 'pacientes',  component: PacientesComponent, canActivate: [ AuthGuard ] },
    { path: 'tratamientos',  component: TratamientosComponent, canActivate: [ AuthGuard ] },
    
    
];
