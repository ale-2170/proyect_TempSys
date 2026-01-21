import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ITemp } from '../Interfaces/ITemp';
import { Observable } from 'rxjs';
import { ISystemAnswer } from '../Interfaces/ISystemAnswer';

/*
Servicio para el manejo de datos  de temperatura (Snapschot).
Centraliza las llamadas al backend  relacionadas con Temperatura. */

@Injectable({
  providedIn: 'root',
})
export class TempService {
  private _http = inject(HttpClient);
  private urlApi = environment.apiUrl;

  /*Obtiene todas las lecturas de Temperatura registradas */
  public GetAllTemp() {
    return this._http.get(`${this.urlApi}Snapshot/GetAllAsync`);
  }
  //Obtiene la temperatura Actual
  public GetTempNow() {
    return this._http.get(`${this.urlApi}Snapshot/GetTempNow`);
  }

  //Obtiene una lectura de temperatura por su ID
  public GetTempById(Id: number) {
    return this._http.get(`${this.urlApi}Usuario/GetUserbyId?id=${Id}`);
  }

  //Obtiene lecturas de temperaturas por un rango de tiempo en minutos
  public GetTempByMinutes(minutes: number): Observable<ITemp> {
    return this._http.get<ITemp>(`${this.urlApi}Snapshot/TempPorTiempo?minutos=${minutes}`);
  }
  //Elimina una lectura de temperatura por su ID
  public DeleteTempById(Id: number): Observable<ISystemAnswer> {
    return this._http.delete<ISystemAnswer>(`${this.urlApi}Snapshot/DeleteAsync?id=${Id}`);
  }
}
