import { Component, Input } from '@angular/core';
import { ControlValueAccessor, UntypedFormControl } from '@angular/forms';

@Component({ template: '' })
export class BasicFormControlComponent implements ControlValueAccessor {
  @Input() public placeholder: string = 'Type something';
  @Input() public label: string;
  @Input() public control: UntypedFormControl;

  public disabled: boolean;

  public value: string;
  public onChange: (_: string) => void;
  public onTouched: () => void;

  constructor() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.onChange = (value: string) => null;
    this.onTouched = () => null;
  }

  public setValue(value: string): void {
    this.value = value;
    this.control.setValue(value);
    this.onChange(this.value);
  }

  public writeValue(value: string): void {
    this.value = value;
    this.onChange(this.value);
  }

  public registerOnChange(fn: (_: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
