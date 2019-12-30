import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemComponent } from './system.component';
import { SystemRoutingModule } from './system-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { SearchComponent } from './components/search/search.component';
import { NavComponent } from './components/nav/nav.component';

@NgModule({
  declarations: [
    SystemComponent,
    HeaderComponent,
    FooterComponent,
    MainContentComponent,
    SearchComponent,
    NavComponent,
  ],
  imports: [CommonModule, SystemRoutingModule],
})
export class SystemModule {}
