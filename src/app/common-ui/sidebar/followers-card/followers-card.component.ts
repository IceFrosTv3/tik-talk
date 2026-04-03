import {Component, Input} from '@angular/core';
import {ProfileInterface} from '../../../data/interfaces/profile.interface';
import {ImageUrlPipe} from '../../../helpers/pipes/image-url.pipe';

@Component({
  selector: 'app-followers-card',
  standalone: true,
  imports: [
    ImageUrlPipe
  ],
  templateUrl: './followers-card.component.html',
  styleUrl: './followers-card.component.scss'
})
export class FollowersCardComponent {
  @Input() profile!: ProfileInterface

}
