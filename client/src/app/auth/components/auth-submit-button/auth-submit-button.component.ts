import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-auth-submit-button',
  templateUrl: './auth-submit-button.component.html',
})
export class AuthSubmitButtonComponent {
  @Output() public submit: EventEmitter<void> = new EventEmitter();
}
