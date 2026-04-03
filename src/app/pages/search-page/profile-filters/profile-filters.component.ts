import {Component, inject, OnDestroy} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {ProfileService} from '../../../data/services/profile.service';
import {debounceTime, startWith, Subscription, switchMap} from 'rxjs';

@Component({
  selector: 'app-profile-filters',
  standalone: true,
    imports: [
        ReactiveFormsModule,
    ],
  templateUrl: './profile-filters.component.html',
  styleUrl: './profile-filters.component.scss'
})
export class ProfileFiltersComponent implements OnDestroy{
  formBuilder = inject(FormBuilder)
  profileService = inject(ProfileService);

  searchForm = this.formBuilder.group({
    firstName: [''],
    username: [''],
    stack: [''],
  })

  searchFormSub!: Subscription;

  constructor() {
    this.searchFormSub = this.searchForm.valueChanges
      .pipe(
        startWith({}),
        debounceTime(600),
        switchMap(formValue => this.profileService.filterProfiles(formValue))
        // takeUntilDestroyed()
      )
      .subscribe()
  }

  ngOnDestroy() {
    this.searchFormSub.unsubscribe();
  }

}
