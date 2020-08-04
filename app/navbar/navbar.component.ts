import { Component, OnInit, ElementRef, ViewChild, Input, HostListener } from "@angular/core";
import { NgForm } from '@angular/forms';
import { store } from "../store.service";
import * as _ from 'lodash';
import {TranslateService} from '@ngx-translate/core';
import { HomeService } from '../home/home.service';

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.scss'],

})


export class NavbarComponent implements OnInit {


  navbarActive: boolean = false;
  scrollPosition: number = 0;
  langSetting: string = localStorage.getItem('language');

  tokenWeb: string = localStorage.getItem('token');
  scope: string = localStorage.getItem('scope');
  tokenType: string = localStorage.getItem('tokenType');
  exiresIn: string = localStorage.getItem('expireIn');


  @ViewChild('infoAcara') infoAcara: ElementRef;
  constructor(
    private translate: TranslateService,
    private homeService: HomeService,


  ) {

  }

  @HostListener('window:scroll')
  ngOnInit() {
    if(localStorage.getItem('language') == null){
      localStorage.setItem('language', "id");
      this.translate.setDefaultLang("id");
    }

    this.getToken();

    window.addEventListener('scroll', this.onScroll, true);
  }
  ngOnDestroy() {
    window.removeEventListener('scroll', this.onScroll, true);
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }


  getToken(){
    this.homeService.getToken().subscribe( data => {
      console.log(data);
      localStorage.setItem('token', data['access_token']);
      localStorage.setItem('scope', data['scope']);
      localStorage.setItem('tokenType', data['token_type']);
      localStorage.setItem('expireIn', data['expires_in']);
    } );
  }

  setLang($event){
    localStorage.setItem('language', $event.target.value);
    window.location.reload()
  }

  toSection(page) {
    document.querySelector('#' + page)
      .scrollIntoView();
  }

  onScroll = (event): void => {
    var el = document.querySelector('body');
    this.scrollPosition = el.scrollTop;
    if (this.scrollPosition == 0) {
      this.navbarActive = false;
    }
    else {
      this.navbarActive = false;
    }

  }


}
