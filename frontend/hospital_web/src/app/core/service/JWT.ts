import { User } from '@core/models/interface';
import { base64, currentTimestamp, filterObject } from './helpers';
import { HttpRequest } from '@angular/common/http';

export class JWT {
  generate(user: User) {
    const expiresIn = 3600;
    const refreshTokenExpiresIn = 86400;

    return filterObject({
      access_token: this.createToken(user, expiresIn),
      token_type: 'bearer',
      expires_in: user['refresh_token'] ? expiresIn : undefined,
      refresh_token: user['refresh_token']
        ? this.createToken(user, refreshTokenExpiresIn)
        : undefined,
    });
  }

  getUser(req: HttpRequest<{refresh_token?: string}>) {
    let token = '';
    if (req.body?.refresh_token) {
      token = req.body.refresh_token;
    } else if (req.headers.has('Authorization')) {
      const authorization = req.headers.get('Authorization');
      const result = (authorization as string).split(' ');
      token = result[1];
    }

    try {
      const now = new Date();
      const data = JWT.parseToken(token);

      return JWT.isExpired(data, now) ? null : data.user;
    } catch (_e) {
      return null;
    }
  }

  createToken(user: User, expiresIn = 0) {
    const exp = user['refresh_token']
      ? currentTimestamp() + expiresIn
      : undefined;

    return [
      base64.encode(JSON.stringify({ typ: 'JWT', alg: 'HS256' })),
      base64.encode(JSON.stringify(filterObject(Object.assign({ exp, user })))),
      base64.encode('redstartheme'),
    ].join('.');
  }

  private static parseToken(accessToken: string) {
    const [, payload] = accessToken.split('.');

    return JSON.parse(base64.decode(payload));
  }

  private static isExpired(data: { exp: number }, now: Date) {
    const expiresIn = new Date();
    expiresIn.setTime(data.exp * 1000);
    const diff = this.dateToSeconds(expiresIn) - this.dateToSeconds(now);

    return diff <= 0;
  }

  private static dateToSeconds(date: Date) {
    return Math.ceil(date.getTime() / 1000);
  }
}
