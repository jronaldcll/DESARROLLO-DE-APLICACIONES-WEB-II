import { Injectable, inject, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { of, switchMap } from 'rxjs';
import { User } from '@core/models/interface';
import { TokenService } from './token.service';
import { LoginService } from './login.service';
import { LocalStorageService } from '@shared/services';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenService = inject(TokenService);
  private loginService = inject(LoginService);
  private store = inject(LocalStorageService);

  currentUser = signal<User>(this.store.get<User>('currentUser') || { roles: [], permissions: [] });

  private change$ = toObservable(this.currentUser);

  change() {
    return this.change$;
  }

  login(username: string, password: string, rememberMe = false) {
    return this.loginService.login(username, password, rememberMe).pipe(
      switchMap((_response) => {
        const returnValue = JSON.parse(JSON.stringify(_response))['token'];
        const roleData: { name: string; priority: number }[] = JSON.parse(JSON.stringify(_response))['user'][
          'roles'
        ];
        roleData.sort((a: { priority: number }, b: { priority: number }) => {
          const aPri: number = a['priority'];
          const bPri: number = b['priority'];
          if (aPri > bPri) return 1;
          else if (aPri < bPri) return -1;
          else return 0;
        });
        this.tokenService.roleArray = roleData;
        this.tokenService.permissionArray = JSON.parse(
          JSON.stringify(_response)
        )['user']['permissions'];

        this.currentUser.set(JSON.parse(JSON.stringify(_response))['user']);
        this.store.set('currentUser', _response.user);

        // Store role names in a new array
        const roleNames = this.tokenService.roleArray.map(
          (role: { name: string }) => role.name
        );

        const roleNamesJSON = JSON.stringify(roleNames);

        // Store the JSON string in LocalStorage
        this.store.set('roleNames', roleNamesJSON);

        this.tokenService.set(returnValue);

        return of(_response); // Return the response to be handled in the component
      })
    );
  }

  check() {
    return this.tokenService.valid();
  }

  logout() {
    // remove user from local storage to log user out
    this.store.clear();
    this.tokenService.clear();
    this.currentUser.set({ roles: [], permissions: [] });
    return of({ success: false });
  }
}
