import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { endPointsUser } from '../api';

@Injectable({
  providedIn: 'root'
})
export class CrosService {
  confirm2(id: any) {
    throw new Error('Method not implemented.');
  }
  private formDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  formData$: Observable<any> = this.formDataSubject.asObservable();

  sendFormData(formData: any) {
    this.formDataSubject.next(formData);
  }
  constructor(private _httpClient: HttpClient) { }

  // Services for Sponsors
  getsponsors(): Observable<any> {
    return this._httpClient.get(endPointsUser.getSponsors)
  }
  getSponsorById(id: any): Observable<any> {
    return this._httpClient.get(endPointsUser.getSponsorsById + id)
  }
  CreateSponsorDetails(data: any): Observable<any> {
    return this._httpClient.post(endPointsUser.getSponsorsAddUpdate, data)
  }

  updateSponsorDetails(data: any): Observable<any> {
    return this._httpClient.put(endPointsUser.getSponsorsAddUpdate, data)
  }
  deleteSponsor(id: any): Observable<any> {
    return this._httpClient.delete(endPointsUser.deleteSponsorById  + id)
  }

  // Services for Sites
  getSites(): Observable<any> {
    return this._httpClient.get(endPointsUser.getSites)
  }
  getSiteById(id: any): Observable<any> {
    return this._httpClient.get(endPointsUser.getSiteById + id)
  }
  CreateSiteDetails(data: string): Observable<any> {
    return this._httpClient.post(endPointsUser.getSiteAddUpdate, data)
  }

  updateSiteDetails(data: []): Observable<any> {
    return this._httpClient.put(endPointsUser.getSiteAddUpdate, data)
  }
  deleteSiteById(id: any): Observable<any> {
    return this._httpClient.delete(endPointsUser.deleteSiteById  + id)
  }

  // Services for Lab Test
  getLabTests(): Observable<any> {
    return this._httpClient.get(endPointsUser.getLabTest)
  }
  getTestDetailsById(id: any): Observable<any> {
    return this._httpClient.get(endPointsUser.getLabTestById  + id)
  }
  createTestDetails(data: any): Observable<any> {

    return this._httpClient.post(endPointsUser.getLabTestAddUpdate, data)
  }
  updateTestDetails(data: any): Observable<any> {
    return this._httpClient.put(endPointsUser.getLabTestAddUpdate, data)
  }
  // deleteLab(id: any): Observable<any> {
  //   return this._httpClient.delete(endPointsUser.getLabTestById  + id)
  // }
  deleteLab(id: any): Observable<any> {
    return this._httpClient.delete(endPointsUser.deleteLabTestById  + id)
  }

  // Services for meterials
  meterials(): Observable<any> {
    return this._httpClient.get(endPointsUser.meterials)
  }
  createMaterialDetails(data: any): Observable<any> {
    return this._httpClient.post(endPointsUser.materialAddUpdate, data)
  }
  updateMaterialDetails(id:any,data: any): Observable<any> {
    return this._httpClient.put(endPointsUser.materialAddUpdate + '/' +id, data)
  }
  getmeterialById(id: any): Observable<any> {
    return this._httpClient.get(endPointsUser.getmeterialById +id)
  }
  deleteMaterial(id: any): Observable<any> {
    return this._httpClient.delete(endPointsUser. deletemeterialById  + id)
  }


  // labs
  getlabs(): Observable<any> {
    return this._httpClient.get(endPointsUser.getLab)
  }
  getLabById(id: any): Observable<any> {
    return this._httpClient.get(endPointsUser.getLabById + id)
  }
  CreateLabDetails(data: any): Observable<any> {
    return this._httpClient.post(endPointsUser.getLabAddUpdate, data)
  }

  updateLabDetails(data: any): Observable<any> {
    return this._httpClient.put(endPointsUser.getLabAddUpdate, data)
  }
  deleteLabById(id: any): Observable<any> {
    return this._httpClient.delete(endPointsUser.deleteLabById  + id)
  }
  
  
}

