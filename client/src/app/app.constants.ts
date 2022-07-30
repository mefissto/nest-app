import { GlobalConfig } from 'ngx-toastr';

export const TOKEN_NAME = 'jwt_token';

export const SOCIAL_ICONS: string[] = ['google', 'facebook', 'github', 'linkedin'];
export const CUSTOM_ICON_PATH = '/assets/img/material-icons';
export const CUSTOM_ICONS: { name: string; path: string }[] = [
  { name: 'google', path: `${CUSTOM_ICON_PATH}/google-brands.svg` },
  { name: 'facebook', path: `${CUSTOM_ICON_PATH}/facebook-f-brands.svg` },
  { name: 'github', path: `${CUSTOM_ICON_PATH}/github-alt-brands.svg` },
  { name: 'linkedin', path: `${CUSTOM_ICON_PATH}/linkedin-in-brands.svg` },
  { name: 'twitter', path: `${CUSTOM_ICON_PATH}/twitter-brands.svg` },
  { name: 'exclamation', path: `${CUSTOM_ICON_PATH}/exclamation-solid.svg` },
  { name: 'logo', path: `${CUSTOM_ICON_PATH}/logo.svg` },
];
export const SNACKBAR_CONFIG: Partial<GlobalConfig> = {
  closeButton: true,
  easeTime: 400,
  maxOpened: 5,
  timeOut: 7000,
};
