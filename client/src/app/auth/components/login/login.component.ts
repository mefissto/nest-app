import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Subject, of, Observable, Subscription, empty } from 'rxjs';
import { exhaustMap, switchMap } from 'rxjs/operators';

import { AuthService } from '../../../core/services/auth.service';
import { AuthUser } from '../../../core/models/auth.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private subs: Subscription = new Subscription();

  public form: FormGroup;
  public formSubmit$: Subject<void> = new Subject();

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

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [Validators.required, Validators.minLength(4), Validators.maxLength(8)],
      ],
    });

    this.subs.add(
      this.formSubmit$
        .pipe(
          exhaustMap(() => this.onSubmit()),
          switchMap(user => user ? this.authService.login(user) : empty()),
        )
        .subscribe(),
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onSubmit(): Observable<AuthUser> {
    console.log(this.form);
    this.form.markAllAsTouched();

    // if () {}

    const user = new AuthUser(this.form.value);
    console.log('user: ', user);
    return of(user);
  }
}
