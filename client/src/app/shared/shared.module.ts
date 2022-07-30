import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@shared/material.module';

import { TooltipRendererDirective } from '@shared/components/tooltip/tooltip.directive';

import { InputComponent } from '@shared/components/input/input.component';
import { TooltipComponent } from '@shared/components/tooltip/tooltip.component';
import { LoaderComponent } from '@shared/components/loader/loader.component';

const COMPONENTS = [InputComponent, LoaderComponent];
const DIRECTIVES = [TooltipRendererDirective];
const MODULES = [FormsModule, ReactiveFormsModule, MaterialModule];

@NgModule({
  imports: [CommonModule, ...MODULES],
  declarations: [TooltipComponent, ...COMPONENTS, ...DIRECTIVES],
  exports: [...COMPONENTS, ...DIRECTIVES, ...MODULES],
})
export class SharedModule {}
