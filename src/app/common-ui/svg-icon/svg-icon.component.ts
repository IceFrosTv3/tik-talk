import {Component, HostBinding, Input} from '@angular/core';

@Component({
  selector: 'svg[icon]',
  standalone: true,
  template: '<svg:use [attr.href]="getHref"></svg:use>',
})
export class SvgIconComponent {
  @Input() icon = '';
  @Input() viewBox = '0 0 14 14';

  @HostBinding('attr.viewBox')
  get hostViewBox() {
    return this.viewBox;
  }

  get getHref() {
    return `assets/svg/${this.icon}.svg#${this.icon}`;
  }
}
