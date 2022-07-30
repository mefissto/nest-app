import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemComponent } from './system.component';
import { SystemRoutingModule } from './system-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { NavComponent } from './components/nav/nav.component';
import { MaterialModule } from '@shared/material.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [SystemComponent, HeaderComponent, FooterComponent, MainContentComponent, NavComponent],
  imports: [CommonModule, SystemRoutingModule, MaterialModule, SharedModule],
})
export class SystemModule {}
