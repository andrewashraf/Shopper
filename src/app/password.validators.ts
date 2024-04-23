import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

// Custom validator for matching passwords
export function passwordMatchValidator(control: FormGroup): { [key: string]: boolean; } | null {
    const password = control.get('password');
    const confirmPassword = control.get('ConfirmPassword');

    return password && confirmPassword && password.value !== confirmPassword.value ? { 'passwordMismatch': true } : null;
}

// Custom validator for password complexity
export const passwordComplexityValidator: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } | null => {
  const password = control.value;
  const containsNumber = /\d/.test(password);
  const hasRequiredLength = password.length >= 5;

  return containsNumber && hasRequiredLength ? null : { 'passwordComplexity': true };
};

