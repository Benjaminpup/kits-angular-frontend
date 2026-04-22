import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endPointsUser } from '../api';

@Injectable({
  providedIn: 'root'
})
export class SponsorService {
  constructor(private _httpClient:HttpClient) { }
  getProtocols():Observable<any>{
    return this._httpClient.get<any>(endPointsUser.croProtocols);
  }
}