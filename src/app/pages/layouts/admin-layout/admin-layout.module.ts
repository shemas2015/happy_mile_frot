import { MatDialogModule } from '@angular/material/dialog';
import { EditarComponent } from './../../doctores/editar/editar.component';
import { DoctoresComponent } from './../../doctores/doctores.component';
import { PlanTratamientoComponent } from './../../plan-tratamiento/plan-tratamiento.component';
import { EditTratamientoComponent } from './../../../edit-tratamiento/edit-tratamiento.component';
import { PacientesComponent } from '../../pacientes/pacientes.component';
import { LoginComponent } from './../../login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { CitasComponent } from './../../citas/citas.component';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { CitaComponent } from './../../cita/cita.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';



import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRippleModule, MatNativeDateModule } from '@angular/material/core';
import {MatError, MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon'

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatTableModule } from '@angular/material/table'  
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { OdontogramaComponent } from 'app/pages/odontograma/odontograma.component';
import { DienteComponent } from 'app/pages/odontograma/diente/diente.component';
import {MatMenuModule} from '@angular/material/menu';
import { TratamientosComponent } from 'app/pages/tratamientos/tratamientos.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { EvolucionComponent } from 'app/pages/evolucion/evolucion.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatIconModule,
    MatTabsModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),

    MatDatepickerModule,
    MatNativeDateModule, 
    NgbModule,
    NgxMaterialTimepickerModule,
    MatTableModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    MatDialogModule
    
    
    
  ],

  providers:[
    DatePipe
  ],
  
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    CitasComponent,
    CitaComponent,
    LoginComponent,
    DoctoresComponent,
    PacientesComponent,
    OdontogramaComponent,
    DienteComponent,
    TratamientosComponent,
    EditTratamientoComponent,
    PlanTratamientoComponent,
    EvolucionComponent,
    EditarComponent
    


    
  ],
  

})

export class AdminLayoutModule {}
