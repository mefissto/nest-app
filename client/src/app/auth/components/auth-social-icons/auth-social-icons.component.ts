import { Component } from '@angular/core';

import { SOCIAL_ICONS } from '@constants';

@Component({
  selector: 'app-auth-social-icons',
  templateUrl: './auth-social-icons.component.html',
  styleUrls: ['./auth-social-icons.component.scss'],
})
export class AuthSocialIconsComponent {
  public socialIcons = SOCIAL_ICONS;
}
