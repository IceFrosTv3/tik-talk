import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProfileInterface} from '../interfaces/profile.interface';
import {PagebleInterface} from '../interfaces/pageble.interface';
import {map, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  http = inject(HttpClient);
  baseApiUrl = 'https://icherniakov.ru/yt-course/account';
  me = signal<ProfileInterface | null>(null);
  filtered = signal<ProfileInterface[]>([]);

  getMe() {
    return this.http.get<ProfileInterface>(this.baseApiUrl + '/me')
      .pipe(tap(res => this.me.set(res)));
  }

  getAccount(id: string) {
    return this.http.get<ProfileInterface>(`${this.baseApiUrl}/${id}`);
  }

  getSubscribersShortList(subsAmount = 3) {
    return this.http.get<PagebleInterface<ProfileInterface>>(this.baseApiUrl + '/subscribers/')
      .pipe(
        map(response => response.items.slice(0, subsAmount))
      );
  }

  updateProfile(profile: Partial<ProfileInterface>) {
    return this.http.patch<ProfileInterface>(this.baseApiUrl + '/me', profile);
  }

  uploadAvatar(file: File) {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post<ProfileInterface>(this.baseApiUrl + '/upload_image', formData);
  }

  filterProfiles(params: Record<string, any>) {
    return this.http.get<PagebleInterface<ProfileInterface>>(
      this.baseApiUrl + '/accounts', {params})
      .pipe(tap(res => this.filtered.set(res.items)));
  }
}
