import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '@core/models/interface';
import { of } from 'rxjs';
import { LocalStorageService } from '@shared/services';
import { JWT } from './JWT';
const jwt = new JWT();

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  protected http = inject(HttpClient);
  private store = inject(LocalStorageService);

  private users: User[] = [
    {
      id: 1,
      username: 'clinivaAdmin',
      password: 'admin@123',
      name: 'Sarah Smith',
      email: 'admin@hospital.org',
      roles: [
        {
          name: 'ADMIN',
          priority: 1,
        },
      ],
      permissions: ['canAdd', 'canDelete', 'canEdit', 'canRead'],
      avatar: 'admin.jpg',
    },
    {
      id: 2,
      username: 'doctor',
      password: 'doctor@123',
      name: 'Ashton Cox',
      email: 'doctor@hospital.org',
      roles: [
        {
          name: 'DOCTOR',
          priority: 2,
        },
      ],
      permissions: ['canAdd', 'canEdit', 'canRead'],
      avatar: 'doctor.jpg',
      refresh_token: true,
    },
    {
      id: 3,
      username: 'patient',
      password: 'patient@123',
      name: 'Cara Stevens',
      email: 'patient@hospital.org',
      roles: [
        {
          name: 'PATIENT',
          priority: 3,
        },
      ],
      permissions: ['canRead'],
      avatar: 'patient.jpg',
      refresh_token: true,
    },
  ];

  login(username: string, password: string, _rememberMe = false) {
    // Using _rememberMe parameter to satisfy linting
    // Simulate a login API call
    const user = this.users.find(
      (u) => u['username'] === username && u['password'] === password
    );
    if (!user) {
      return of({ status: 401, body: {} });
    }

    if (user['password'] !== password) {
      const result = {
        status: 422,
        error: {
          errors: { password: ['The provided password is incorrect.'] },
        },
      };
      return of(Object.assign(result));
    }

    const currentUser = Object.assign({}, user);
    delete currentUser['password'];

    if (user) {
      const userResponse = {
        user: currentUser,
        token: jwt.generate(currentUser),
        status: 200,
      };

      return of(userResponse);
    } else {
      return of({ error: 'Invalid credentials' });
    }
  }

  refresh() {
    const user = Object.assign({}, this.store.get('currentUser'));

    const result = user
      ? { status: 200, body: jwt.generate(user) }
      : { status: 401, body: {} };

    return of(result);
  }

  logout() {
    this.store.clear();
    return of({ success: false });
  }

  user() {
    return this.http.get<User>('/user');
  }
}
