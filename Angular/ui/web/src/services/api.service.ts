import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Device } from 'src/model/device';

const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

const apiUrl = 'http://localhost:5000/api/produto';

@Injectable({providedIn: 'root'})

export class ApiService {

  constructor(private http: HttpClient) { }

  // Get all devices
  getDevices (): Observable<Device[]> {
    return this.http.get<Device[]>(apiUrl)
      .pipe(
        tap(devices => console.log('read devices')),
        catchError(this.handleError('getDevices', []))
      );
  }

  // Get device detail
  getDevice(id: number): Observable<Device> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Device>(url).pipe(
      tap(_ => console.log(`read the device id=${id}`)),
      catchError(this.handleError<Device>(`getDevice id=${id}`))
    );
  }

  // Add a new device
  addDevice (device): Observable<Device> {
    return this.http.post<Device>(apiUrl, device, httpOptions).pipe(      
      tap((device: Device) => console.log(`adicionou o produto com w/ id=${device.id}`)),
      catchError(this.handleError<Device>('addDevice'))
    );
  }

  // Delete Device
  deleteDevice (id): Observable<Device> {
    const url = `${apiUrl}/delete/${id}`;

    return this.http.delete<Device>(url, httpOptions).pipe(
      tap(_ => console.log(`remove device with id=${id}`)),
      catchError(this.handleError<Device>('deleteDevice'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }

}
