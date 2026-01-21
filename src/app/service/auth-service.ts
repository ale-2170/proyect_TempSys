import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../environments/environment';
import { ILogin } from '../Interfaces/ILogin';
import { catchError, tap, throwError } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
 private _http = inject(HttpClient);
  private _apiUrl = environment.apiUrl;
  private platformId = inject(PLATFORM_ID);

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  login(data: ILogin) {
  return this._http
    .post<any>(`${this._apiUrl}Login/LoginUser`, data)
    .pipe(
      tap(res => {
        if (!this.isBrowser()) return;

        localStorage.setItem('token', res.token);
        localStorage.setItem('expiracion', res.expiracion);
      }),
      catchError(error => {
        let mensaje = 'Error inesperado';

        if (error.status === 400 || error.status === 401) {
          mensaje = error.error?.message ?? 'Credenciales incorrectas';
        } else if (error.status === 0) {
          mensaje = 'No se pudo conectar con el servidor';
        }

        return throwError(() => mensaje);
      })
    );
}

  logout() {
    if (!this.isBrowser()) return;

    localStorage.removeItem('token');
    localStorage.removeItem('expiracion');
  }

  getToken(): string | null {
    if (!this.isBrowser()) return null;
    return localStorage.getItem('token');
  }

  private getExpiracion(): string | null {
    if (!this.isBrowser()) return null;
    return localStorage.getItem('expiracion');
  }

  isTokenExpired(): boolean {
    const exp = this.getExpiracion();
    if (!exp) return true;

    return new Date(exp).getTime() < Date.now();
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired();
  }
}
