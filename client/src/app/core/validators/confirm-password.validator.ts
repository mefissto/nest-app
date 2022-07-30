import { AbstractControl, ValidationErrors } from '@angular/forms';

export const confirmPasswords = (group: AbstractControl): ValidationErrors | null => {
  const pass = group.get('password');
  const confirmPass = group.get('confirmPassword');
  const isEqual: boolean = pass.value === confirmPass.value;

  if (!isEqual) {
    confirmPass.setErrors({ passwordNotEqual: true });

    return { notSame: true };
  }

  return null;
};
