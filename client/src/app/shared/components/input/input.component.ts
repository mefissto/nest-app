import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputTypes } from '@core/types/input-types';
import { BasicFormControlComponent } from '@shared/components/basic-form-control.component';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent extends BasicFormControlComponent implements ControlValueAccessor {
  @Input() public type: InputTypes = 'text';
  @Input() public iconName: string;
}
