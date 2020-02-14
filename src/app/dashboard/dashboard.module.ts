import { EnvService } from './../services/env.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  declarations: [DashboardComponent, NavbarComponent],
  imports: [CommonModule, DashboardRoutingModule, NgZorroAntdModule],
  exports: [DashboardComponent],
  providers: [EnvService],
})
export class DashboardModule {}
