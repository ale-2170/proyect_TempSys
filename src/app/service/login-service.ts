import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ILogin } from '../Interfaces/ILogin';
import { Observable } from 'rxjs';
import { ISystemAnswer } from '../Interfaces/ISystemAnswer';

/* 
Servicio encargado de la Autenticacion del Usuario.
Se comunica con el backend para Realizar el login
*/

@Injectable({
  providedIn: 'root',
})

//Inyection del cliente HTTP  de Angular
export class LoginService {
  private _http = inject(HttpClient);
  private ApiUrl = environment.apiUrl; // URL base de la API  definida en el environment

  public Login(object: ILogin): Observable<ISystemAnswer> {
    return this._http.post<ISystemAnswer>(`${this.ApiUrl}Login/LoginUser`, object);
  }
}
