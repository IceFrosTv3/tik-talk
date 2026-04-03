import {Component, inject, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  authService = inject(AuthService);
  router = inject(Router);
  // isPasswordVisible: boolean = false;
  isPasswordVisible = signal<boolean>(false);

  // togglePassword() {
  //   this.isPasswordVisible = !this.isPasswordVisible;
  // }

  form = new FormGroup({
    username: new FormControl('', {
      nonNullable: true,
      validators: Validators.required
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: Validators.required
    }),
  })

  onSubmit(event: Event) {
    if (this.form.valid) {
      this.authService.login(this.form.getRawValue())
        .subscribe(response => this.router.navigate(['/']));
    }
  }
}
