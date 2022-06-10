import { Injectable } from '@angular/core';

@Injectable()
export class CookieService {
  public setCookie(name: string, value: string, expire?: Date | number): void {
    const expires = new Date(new Date(expire).setFullYear(new Date(expire).getFullYear() + 1));
    const btoaValue = btoa(value);
    document.cookie = `${name}=${btoaValue}; path=/; expires=${expires.toUTCString()}`;
  }

  public getCookie(name: string): string {
    const cookies = document.cookie.split(';');
    const cookie = cookies.find((val) => val.indexOf(name) > -1);

    if (cookie) {
      return atob(cookie.slice(name.length + 1));
    }
    return '';
  }
}
