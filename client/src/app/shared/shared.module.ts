import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '@shared/material.module';

import { TooltipRendererDirective } from '@shared/components/tooltip/tooltip.directive';

import { InputComponent } from '@shared/components/input/input.component';
import { TooltipComponent } from '@shared/components/tooltip/tooltip.component';

const COMPONENTS = [InputComponent];
const DIRECTIVES = [TooltipRendererDirective];
const MODULES = [MaterialModule, FormsModule, ReactiveFormsModule, RouterModule];

@NgModule({
  imports: [CommonModule, ...MODULES],
  declarations: [TooltipComponent, ...COMPONENTS, ...DIRECTIVES],
  exports: [...COMPONENTS, ...DIRECTIVES, ...MODULES],
})
export class SharedModule {}
