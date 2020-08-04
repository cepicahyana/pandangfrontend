import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import * as _ from 'lodash';
import jwt from 'jsonwebtoken';
import { AppConfig } from '@environments';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(
    private http: HttpClient
  ) {

  }

  getToken() {
    const options = {
      headers: new HttpHeaders({
        'Authorization': `${AppConfig.BasciAuth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTION',
      }),
    };

    const body = 'grant_type=client_credentials';
    return this.http.post(`${AppConfig.baseURL}/token`, body, options);
  }

  getMode() {
    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }),
      withCredentials: false,
      crossDomain: true,
      cache: false
    };
    return this.http.get(`${AppConfig.baseURL}/pandang/v1/mode`, options);
  }

  getAccess() {
    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }),
      withCredentials: false,
      crossDomain: true,
      cache: false
    };

    return this.http.get(`${AppConfig.baseURL}/pandang/v1/access_web`, options);
  }


  getSlider() {
    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }),
      withCredentials: false,
      crossDomain: true,
      cache: false
    };

    return this.http.get(`${AppConfig.baseURL}/pandang/v1/slider_home`, options);
  }

  getFavicon() {
    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }),
      withCredentials: false,
      crossDomain: true,
      cache: false
    };

    return this.http.get(`${AppConfig.baseURL}/pandang/v1/favicon`, options);
  }

  getVideo() {
    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }),
      withCredentials: false,
      crossDomain: true,
      cache: false
    };

    return this.http.get(`${AppConfig.baseURL}/pandang/v1/video_home`, options);
  }
}
