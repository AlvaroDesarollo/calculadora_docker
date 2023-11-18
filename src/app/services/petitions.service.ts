import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.local';

enum complemento {
  sumar = '/suma',
  multiplicar = '/Multip',
  restar = '/resta',
  dividir = '/divi',
  raiz = '/raiz',
  modulo = '/modulo',
}
@Injectable({
  providedIn: 'root',
})
export class PetitionsService {
  public url: string = '';
  constructor(private http: HttpClient) {}

  get urlBase() {
    return this.url;
  }

  set urlBase(value: string) {
    this.url = value;
  }

  public petitionPost(
    body: any,
    urlComplemento:
      | 'sumar'
      | 'multiplicar'
      | 'restar'
      | 'dividir'
      | 'raiz'
      | 'modulo'
  ): Observable<string> {
    this.urlBase = `${environment.urlBase}${complemento[urlComplemento]}`;
    return this.pettition(body);
  }

  private pettition(body: any): Observable<string> {
    return this.http
      .post(this.urlBase, body)
      .pipe(map((response: any) => response.resul.toString()));
  }
}
