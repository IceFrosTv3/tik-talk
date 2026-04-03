import {Component, Input} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {ProfileInterface} from '../../data/interfaces/profile.interface';
import {ImageUrlPipe} from '../../helpers/pipes/image-url.pipe';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ImageUrlPipe
  ],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss'
})
export class ProfileCardComponent {
  @Input() profile!:ProfileInterface

}
