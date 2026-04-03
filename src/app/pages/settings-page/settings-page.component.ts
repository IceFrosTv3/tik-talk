import {Component, effect, inject, ViewChild} from '@angular/core';
import {ProfileHeaderComponent} from '../../common-ui/profile-header/profile-header.component';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {SvgIconComponent} from '../../common-ui/svg-icon/svg-icon.component';
import {Router, RouterLink} from '@angular/router';
import {ProfileService} from '../../data/services/profile.service';
import {firstValueFrom} from 'rxjs';
import {AuthService} from '../../auth/auth.service';
import {AvatarUploadComponent} from './avatar-upload/avatar-upload.component';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [
    ProfileHeaderComponent,
    ReactiveFormsModule,
    SvgIconComponent,
    RouterLink,
    AvatarUploadComponent
  ],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss'
})
export class SettingsPageComponent {
  @ViewChild(AvatarUploadComponent) avatarUpload!: AvatarUploadComponent;

  formBuilder = inject(FormBuilder);
  profileService = inject(ProfileService);
  router = inject(Router);
  authService = inject(AuthService);

  form = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: [{value: '', disabled: true}, Validators.required],
    description: [''],
    stack: [''],
  })

  constructor() {
    effect(() => {
      const me = this.profileService.me()
      if (me) {
        this.form.patchValue({
          ...me,
          stack: this.mergeStack(me?.stack ?? []),
        })
      }
    });
  }

  onInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = '0';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  onSave() {
    this.form.markAllAsTouched()
    this.form.updateValueAndValidity()

    if (this.form.invalid) return

    const avatar = this.avatarUpload.avatar;
    if (avatar) {
      firstValueFrom(this.profileService.uploadAvatar(avatar))
    }

    // @ts-ignore
    firstValueFrom(this.profileService.updateProfile({
      ...this.form.getRawValue(),
      stack: this.splitStack(this.form.getRawValue().stack)
    }))

    this.router.navigate(['/profile/me']);
  }

  splitStack(stack: string | null | string[]): string[] {
    if (!stack) return [];
    if (Array.isArray(stack)) return stack;

    return stack
      .split(',')
      .map(s => s.trim())
      .filter(s => s);
  }

  mergeStack(stack: string | null | string[]) {
    if (!stack) return '';
    if (Array.isArray(stack)) return stack.join(',');

    return stack
  }

}
