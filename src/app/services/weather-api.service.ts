import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class WeatherApiService {

  readonly API_KEY = "5DvXHKTJlIbwGRLCWUK0zVXF8791JoGk";

  constructor(private http:HttpClient) { }

  getRequest(url, q?) {
    const params = new HttpParams({fromObject: {apikey: this.API_KEY, q}});
    return this.http.get(url, {params});
  }

  getAutoComplete(key: string): Observable<any> {
    const url = `https://dataservice.accuweather.com/locations/v1/cities/autocomplete`;
    return this.getRequest(url, `${key}`);
  }
 
  get5DaysOfForecasts(key: string): Observable<any> {
    const url = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}`;
    return this.getRequest(url);
  }

  getCurrentConditions(key: string): Observable<any> {
    const url = `https://dataservice.accuweather.com/currentconditions/v1/${key}`;
    return this.getRequest(url);
  }

}
