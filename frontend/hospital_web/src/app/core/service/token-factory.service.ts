import { Injectable } from '@angular/core';
import { SimpleToken, JwtToken, BaseToken } from './token';
import { Token } from '@core/models/interface';

@Injectable({
  providedIn: 'root',
})
export class TokenFactory {
  create(attributes: Token): BaseToken | undefined {
    if (!attributes.access_token) {
      return undefined;
    }

    if (JwtToken.is(attributes.access_token)) {
      return new JwtToken(attributes);
    }

    return new SimpleToken(attributes);
  }
}
