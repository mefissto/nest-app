import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from '../../../core/services/auth.service';
import { HelperService } from '../../../core/services/helper.service';
import { AuthUser } from '../../../core/models/auth/auth.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit, OnDestroy {
  private subs: Subscription = new Subscription();

  public form: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
  ) {}

  get email(): AbstractControl {
    return this.form.get('email');
  }

  get password(): AbstractControl {
    return this.form.get('password');
  }

  get username(): AbstractControl {
    return this.form.get('username');
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [Validators.required, Validators.minLength(4), Validators.maxLength(8)],
      ],
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onSubmit(): void {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      const userModel = new AuthUser(this.form.value);
      this.subs.add(
        this.authService.registration(userModel).subscribe(
          () => {
            this.form.reset();
            HelperService.resetMaterializeInputs();
          },
          err => {
            if (err.status === 403) {
              this.email.setErrors({ exist: true });
            }
          },
        ),
      );
    }
  }
}
