import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { MaterialModule } from '../material/material.module';
import { PerfilComponent } from './layout/perfil/perfil.component';


@NgModule({
  declarations: [
    DashboardLayoutComponent,
    PerfilComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule
  ]
})
export class DashboardModule { }
