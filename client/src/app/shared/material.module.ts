import { NgModule } from '@angular/core';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatFormFieldModule } from '@angular/material/form-field';

const MODULES = [MatSidenavModule, MatIconModule, OverlayModule, MatFormFieldModule];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES],
})
export class MaterialModule {}
