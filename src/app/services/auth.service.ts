import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {User} from '../models/user';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {
  private BASE_URL: string = 'http://localhost:8000';
  private headers: Headers = new Headers({
    'Content-Type': 'application/json',
  });
  private client_id: string = '1_3bcbxd9e24g0gk4swg0kwgcwg4o8k8g4g888kwc44gcc0gwwk4';
  private client_secret: string = '4ok2x70rlfokc8g0wws8c8kwcokw80k44sg48goc0ok4w0so0k';

  constructor(private http: Http) {
  }

  login(user: User): Promise<any> {
    let data = {
      client_id: this.client_id,
      client_secret: this.client_secret,
      grant_type: 'password',
      username: user.email,
      password: user.password,
    };
    let url: string = `${this.BASE_URL}/oauth/v2/token`;
    return this.http.post(url, data, {headers: this.headers}).toPromise();
  }

  ensureAuthenticated(token): Promise<any> {
    let url: string = `${this.BASE_URL}/api/users/current`;
    let data = {
      client_id: this.client_id,
      client_secret: this.client_secret,
    };
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
    return this.http.get(url, {headers: headers}).toPromise();
  }
}
