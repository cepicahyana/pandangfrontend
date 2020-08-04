import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as _ from 'lodash';
import jwt from 'jsonwebtoken';
import { AppConfig } from '@environments';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(
    private http: HttpClient
  ) {

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

    return this.http.get(`${AppConfig.baseURL}/pandang/v1/slider_register`, options);
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

  getBackground() {
    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }),
      withCredentials: false,
      crossDomain: true,
      cache: false
    };
    return this.http.get(`${AppConfig.baseURL}/pandang/v1/background_register`, options);
    //return this.http.get(`${AppConfig.baseURL}/pandang/v1/background_register`, options);
  }

  getRegister(fcheck) {
    const token = jwt.sign(fcheck, 'pandangistana75');

    const formData = new FormData();
    formData.append('searchEmail', fcheck.searchEmail);
    formData.append('searchNIK', fcheck.searchNIK);
    formData.append('searchPhone', fcheck.searchPhone);

    const options = {

      withCredentials: false,
      crossDomain: true,
      cache: false
    };

    return this.http.post(`${AppConfig.baseURL}/pandang/v1/check_registration`, formData, options);
  }

  getProfesion(lang) {
    const body = {
      'lang': lang
    }

    const formData = new FormData();
    formData.append('lang', lang);

    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }),
      withCredentials: false,
      crossDomain: true,
      cache: false
    };

    return this.http.post(`${AppConfig.baseURL}/pandang/v1/profession`, formData, options);
  }

  postRegister(f) {
    const token = jwt.sign(f, 'pandangistana75')
    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }),
      withCredentials: false,
      crossDomain: true,
      cache: false
    };

    return this.http.post(`${AppConfig.baseURL}/pandang/v1/registration`, f, options);
    //return this.http.get(`https://lundara.com/hutri_api/auth/index`,options);
  }

  postRegisterZoom(f) {
    const token = jwt.sign(f, 'pandangistana75')
    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTION',

      }),
      withCredentials: false,
      crossDomain: true,
      cache: false
    };

    return this.http.post(`${AppConfig.baseURL}/pandang/v1/registrationZoom`, f, options);
  }
}
