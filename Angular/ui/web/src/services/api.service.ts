import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Device } from 'src/model/device';
import { Category } from '../model/model';

const httpOptions = {headers: new HttpHeaders({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Access-Control-Allow-Origin': 'http://localhost:4200/'
})};

const baseUrl = 'http://localhost:8080/api/';
const apiDeviceUrl = baseUrl + 'devices';
const apiCategoryUrl = baseUrl + 'categories';


@Injectable({providedIn: 'root'})

export class ApiService {

  constructor(private http: HttpClient) { }

  // Get all devices
  getDevices (): Observable<Device[]> {
    return this.http.get<Device[]>(apiDeviceUrl)
      .pipe(
        tap(devices => console.log('read devices')),
        catchError(this.handleError('getDevices', []))
      );
  }

  // Get device detail
  getDevice(id: number): Observable<Device> {
    const url = `${apiDeviceUrl}/${id}`;
    return this.http.get<Device>(url).pipe(
      tap(_ => console.log(`read the device id=${id}`)),
      catchError(this.handleError<Device>(`getDevice id=${id}`))
    );
  }

  // Add a new device
  addDevice (device): Observable<Device> {
    return this.http.post<Device>(apiDeviceUrl, device, httpOptions).pipe(      
      tap((device: Device) => console.log(`added a new device with id=${device.id}`)),
      catchError(this.handleError<Device>('addDevice'))
    );
  }

  // Delete Device
  deleteDevice (id:number) {
    // const url = `${apiDeviceUrl}/${id}`;
    // console.log("URL Device = "+url);

    // this.http.delete(url, httpOptions).pipe(
    //   tap(_ => console.log(`remove device with id=${id}`)),
    //   catchError(this.handleError<Device>('deleteDevice'))
    // );

    let httpParams = new HttpParams()
      .set('id', id.toString());    

    let options = { params: httpParams };

    return this.http.delete(apiDeviceUrl+"/"+id,options);
    
  }

  // Get All Categories
  getCategories (): Observable<Category[]> {
    return this.http.get<Category[]>(apiCategoryUrl)
      .pipe(
        tap(category => console.log('read categories')),
        catchError(this.handleError('getCategories', []))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }

}
