import {Component, inject} from '@angular/core';
import {SvgIconComponent} from '../svg-icon/svg-icon.component';
import {AsyncPipe, NgForOf} from '@angular/common';
import {FollowersCardComponent} from './followers-card/followers-card.component';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {ProfileService} from '../../data/services/profile.service';
import {firstValueFrom} from 'rxjs';
import {ImageUrlPipe} from '../../helpers/pipes/image-url.pipe';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    SvgIconComponent,
    NgForOf,
    FollowersCardComponent,
    RouterLink,
    AsyncPipe,
    ImageUrlPipe,
    RouterLinkActive,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  profileService = inject(ProfileService);
  subscribers$ = this.profileService.getSubscribersShortList();
  me =this.profileService.me

  menuItems = [
    {label: 'Моя страница', icon: 'home', link: '/profile/me'},
    {label: 'Чаты', icon: 'chat', link: '/chats'},
    {label: 'Поиск', icon: 'search', link: '/search'},
  ]

  ngOnInit() {
    firstValueFrom(this.profileService.getMe())
  }
}
