import {
  Injectable,
  Inject,
  Injector,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformServer } from '@angular/common';

export class Cookie {
  constructor(public value: any, public options: any) { }
}

declare var Zone: any;

@Injectable()
export class CookieService {
  public setCookies: {[key: string]: Cookie} = {};
  public cookies = '';

  public PREFIX = 'SM_';

  constructor(
    @Inject(PLATFORM_ID) public platform_id,
    public injector: Injector
  ) {
    // this.getRightCookie();
  }

  /**
   * Sets the cookie
   */
  public set(key: string, value: string, expiryDays: number, useSeconds: boolean = false): void {
    const date: Date = new Date();
    const prefix: string = this.PREFIX + key;
    const validation: number = useSeconds ? expiryDays * 1000 : date.getTime() + (expiryDays * 24 * 60 * 60 * 1000);

    date.setTime(validation);

    if (isPlatformServer(this.platform_id)) {
      // Server
      this.setCookies[prefix] = {
        value: value,
        options: {
          expires: date,
          path: '/'
        }
      };

      if (this.injector.get<any>(<any>'NODE_REQUEST').cookies[prefix] !== this.setCookies[prefix].value) {
        this.injector.get<any>(<any>'NODE_RESPONSE').cookie(prefix, this.setCookies[prefix].value, this.setCookies[prefix].options);
      }
    } else {
      // Browser
      const expires: string = 'expires=' + date.toUTCString();

      document.cookie = prefix + '=' + value + ';' + expires + ';path=/';
    }
  }

  /**
   * Get value of cookie
   */
  public get(key: string, shouldPrefix: boolean = true): string {
    this.getRightCookie();
    const prefixedKey = shouldPrefix ? this.PREFIX + key : key;
    let found = '';

    if (isPlatformServer(this.platform_id) && typeof this.setCookies[prefixedKey] != 'undefined') {
      found = this.setCookies[prefixedKey].value;

    } else {
      const name = prefixedKey + '=';

      const ca = this.cookies.split(';');

      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];

        c = c.trim();

        if (c.indexOf(name) === 0) {
          found = c.substring(name.length, c.length);
        }
      }
    }

    return found;
  }

  public getRightCookie(): void {
    if (isPlatformServer(this.platform_id)) {
      this.cookies = this.injector.get<any>(<any>'NODE_REQ').get('Cookie') || '';
    } else {
      this.cookies = document.cookie;
    }
  }

  /**
   * Remove cookie with this key.
   */
  public remove(key: string): void {
    const prefix: string = this.PREFIX + key;
    this.set(prefix, '', -1);
  }
}
