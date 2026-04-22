import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LSponsers } from './lsponsers';
import { LabTests } from './lab-tests';
import { CROS } from './cros';
import { Protocol } from './protocol';
import { Sites } from './sites';
import { Observable } from 'rxjs';
import { endPointsUser } from 'src/app/api';

@Injectable(
  { providedIn: 'root', }
)
export class ProtocolService {
  deleteprotocol(id: any) {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient) { }


  protocolList: Protocol[] = [];

  postProtocol(data: any): Observable<any> {
    return this.http.post(endPointsUser.postProtocol, data)
  }
  getProtocol() {
    return this.http.get(endPointsUser.croProtocols)
  }
  getProtocolId(id: any): Observable<any> {
    return this.http.get(endPointsUser.getProtocolId + id)
  }
  dashboardtable(id: any,): Observable<any> {
    return this.http.get(endPointsUser.dashboardtable+id) 
  }
  deleteprotocolById (id: any): Observable<any> {
    return this.http.delete(endPointsUser.deleteprotocolById  + id)
  }
  
  kitsinventory(id: any, payload: any): Observable<any> {
    return this.http.post(endPointsUser.kitsinventory + id, payload)
  }

  kitsnsv(id: any, site: any, payload: any): Observable<any> {
    return this.http.post(endPointsUser.kitsnsv + id + '/' + site, payload)
  }
 
  postPreparation(data: any): Observable<any> {
    return this.http.post(endPointsUser.postPreparation, data)
  }
  getPreparation() {
    return this.http.get(endPointsUser.getPreparation)
  }
  getPreparationBySId(id1: any) {
    return this.http.get(endPointsUser.getPreparation + '/' + id1)
  }
  getPreparationBySponsor(id1: any) {
    return this.http.get(endPointsUser.croProtocols + '/' + id1)
  }
  getPreparationById(id: any): Observable<any> {
    return this.http.get(endPointsUser.getPreparationById + id)
  }
  sampleack(id: any, id1: any): Observable<any> {
    return this.http.get(endPointsUser.sampleack + id + '/' + id1)
  }
  sampleackput(data: any): Observable<any> {
    return this.http.put(endPointsUser.sampleackput, data)
  }
  updatePreparationById(data: any): Observable<any> {
    return this.http.put(endPointsUser.postPreparation, data)
  }


}  