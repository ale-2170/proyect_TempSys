import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IUsuario } from '../Interfaces/IUsuarios';
import { Observable } from 'rxjs';
import { ISystemAnswer } from '../Interfaces/ISystemAnswer';
import { Ipagination } from '../Interfaces/Ipagination';
import { IPaginatedResponse } from '../Interfaces/IPaginatedResponse';

/*Servicio para la Gestion de Usuario.
Maneja operaciones CRUD y paginacion contra la API*/

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private _http = inject(HttpClient);
  private urlApi = environment.apiUrl;

  public GetAllusers(object: IUsuario) {
    return this._http.get(`${this.urlApi}Usuario/GetAllUsers`);
  }

  public GetUserById(Id: Number) {
    return this._http.get(`${this.urlApi}Usuario/GetUserbyId?id=${Id}`);
  }

  public GetUserPagination(obj: Ipagination): Observable<IPaginatedResponse> {
    return this._http.post<IPaginatedResponse>(`${this.urlApi}Usuario/GetPaginationUsers`, obj);
  }

  public SetUser(object: IUsuario): Observable<ISystemAnswer> {
    return this._http.post<ISystemAnswer>(`${this.urlApi}Usuario/SetUsuario`, object);
  }

  public UpdateUser(object: IUsuario): Observable<ISystemAnswer> {
    return this._http.post<ISystemAnswer>(`${this.urlApi}Usuario/UpdateUsuario`, object);
  }
}
