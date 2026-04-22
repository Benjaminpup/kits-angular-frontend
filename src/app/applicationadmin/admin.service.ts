import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { endPointsUser } from '../api';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  [x: string]: any;
  httpOptions = {
    headers: new HttpHeaders({
                 'Content-Type': 'application/json',
                 'Access-Control-Allow-Origin': '*',
                 'Access-Control-Allow-Credentials': 'true'
    })
  }; 
  constructor(private _httpClient: HttpClient) {
   
   }
  //  ,{headers:this.headers}
  // Services for cro
  private jsonUrl = 'assets/jsondata.json';
  private jsonUrlr = 'assets/reports.json';
  private inventoryr = 'assets/inventory.json';
 getsite(): Observable<any> {
  return this._httpClient.get(this.jsonUrl);
}
getReports(): Observable<any> {
  return this._httpClient.get(this.jsonUrlr);
}
getInventory(): Observable<any> {
  return this._httpClient.get(this.inventoryr);
}


  getCro(headers?:any): Observable<any> {
    return this._httpClient.get(endPointsUser.getcros,{ observe: 'response', headers });
  }
  getCrobyId(id: any): Observable<any> {
    return this._httpClient.get(endPointsUser.getCroById + id)
  }
  CreateCroDetails(data: string): Observable<any> {
    return this._httpClient.post(endPointsUser.getCroAddUpdate, data)
  }
  updateCroDetaild(data: []): Observable<any> {
    return this._httpClient.put(endPointsUser.getCroAddUpdate, data)
  }
  deleteCro(id: any): Observable<any> {
    console.log("Deleting CRO with ID:", id); // Add this line
    return this._httpClient.delete(endPointsUser.deleteCroById + id);
  }
  getLocationbyId(zipcode: any): Observable<any> {
    return this._httpClient.get(endPointsUser.getLocationByZipcode + zipcode)
  }
  

  // Services for USer
  getUser(): Observable<any> {
    return this._httpClient.get(endPointsUser.getUser)
  }
  getUserbyId(id: any,headers?:any): Observable<any> {
    return this._httpClient.get(endPointsUser.getUserById + id, { observe: 'response', headers })
  }
  createUser(data: string): Observable<any> {
    return this._httpClient.post(endPointsUser.getUserAddUpdate, data)
  }
  updateUser(data: []): Observable<any> {
    return this._httpClient.put(endPointsUser.getUserAddUpdate, data)
  }
  getUserUpdate(id: any, data:any): Observable<any> {
    return this._httpClient.put(endPointsUser.getUserUpdate + id, data)
  }
  deleteUserById(id: any): Observable<any> {
    return this._httpClient.delete(endPointsUser.deleteUserById  + id)
  }
  // Login Services
  login(data: any): Observable<any> {
    return this._httpClient.post(endPointsUser.login, data)
  }
  otp(data: any,headers?:any): Observable<any> {
    return this._httpClient.post(endPointsUser.sendotp, data,{ observe: 'response', headers })
  }


  reset(data: any): Observable<any> {
    return this._httpClient.put(endPointsUser.reset, data)
  }

  dashboard(){
    return this._httpClient.get(endPointsUser.dashboard)
  }




}
