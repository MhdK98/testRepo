import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseurl } from 'src/environments/environment';
import { Currency } from './home/currency.modal';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  public getToken(){
    return localStorage.getItem("token");
  }

  public LogOut(){
    localStorage.removeItem("token");
  }

  public headerOptions = new HttpHeaders({
    'Content-Type': 'application/json-patch+json',
  });

  public params = new HttpParams()
  .set('page','10')
  .set('size','20');
  
  constructor(private _http: HttpClient) { 
  }
/*
  public Login(user): Observable<any>{
    return this._http.post<any>(`${baseurl}FXDealsAuthentication/authenticate`,user, {headers: this.headerOptions, observe: 'response', params:this.params});
  }
  */
  public Login(user): Observable<any>{
    return this._http.post<any>(`${baseurl}FXDealsAuthentication/authenticate`,user, {headers: this.headerOptions, observe: 'response'});
  }

  public addCurrency(currency:Currency): Observable<any>{
    return this._http.post<any>(`${baseurl}fx_currencieses`,currency, {headers: this.headerOptions, observe: 'response'});
  }

  public getAllCurrencieses(): Observable<any>{
    return this._http.get<any>(`${baseurl}api/main/getAllCurrencies`, {headers: this.headerOptions, observe: 'response'});
  }
}
