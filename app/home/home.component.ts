import { Component, OnInit, ElementRef, ViewChild, LOCALE_ID, Inject, HostListener } from "@angular/core";
import { NgForm } from '@angular/forms';
import { store } from "../store.service";
import { PNotifyService } from '../pnotify.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Router } from "@angular/router";
import { AppConfig } from '@environments';
import { RegisterService } from '../register/register.service';
import { HomeService } from './home.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";


@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
  providers: [MessageService]

})


export class HomeComponent implements OnInit {
  baseUrlAPI: string = AppConfig.baseURL;
  captchaKey: string = AppConfig.captchaKey;

  pnotify = undefined;
  currentMenu: string = '';
  currentSection = 'home';

  captchaCheck: string = "";
  displayCheck: boolean = false;
  loadingCheck: boolean = false;
  notFoundCheck: boolean = false;
  alertCaptchaCheck: boolean = false;

  // VARIABLE SHOW DATA
  searchNIK: string = "";

  dataCheck: boolean = false;

  imgKTP: string = "";
  imgKK: string = "";
  showName: string = "";
  showNIK: string = "";
  showKK: string = "";
  showGender: string = "";
  showPhone: string = "";
  showEmail: string = "";
  showProvince: string = "";
  showCity: string = "";
  showAddress: string = "";
  showReason: string = "";
  statusReg: string = "";
  statusAlertType: string = "";
  showReqAcara: string = "";
  showReqSuci: string = "";


  alertMantap: boolean = false;
  oke: boolean = false;

  disabledPlay: boolean = true;
  disabledStop: boolean = false;
  showPlay: boolean = false;
  showPause: boolean = true;
  sliderInterval: number = 3000;

  sliderItem: any[] = [];
  faviconURL: string = '';
  videoHome: string = '';
  showVideo: boolean = false;

  //init setting web
  accessWeb: string = '';
  modeWeb: string = '';
  langSetting: string = localStorage.getItem('language');
  captionClose: string = '';

  favIcon: HTMLLinkElement = document.querySelector('#favIcon');
  constructor(
    private pnotifyService: PNotifyService,
    private messageService: MessageService,
    private registerService: RegisterService,
    private homeService: HomeService,
    private router: Router,
    private translate: TranslateService,
    private http: HttpClient
  ) {
    this.pnotify = this.pnotifyService;

    translate.setDefaultLang(this.langSetting);
  }
  @HostListener('window:scroll', ['$event'])
  ngOnInit() {
    /*LIST LOAD DATA
      1. ACCESS
      2. MODE
      3. SLIDER
      4. VIDEO
      5. FAVICON
    */
    setTimeout(() => {
      this.getAccess();
      this.getMode();
      this.getSlider();
      this.getFavicon();
    }, 1000);

    setTimeout(() => {
      this.getVideo();
    }, 3000);

  }

  changeOke(){
    if(this.oke === true){
      this.oke = false;
    }else{
      this.oke = true;
    }
  }

  getAccess() {
    this.homeService.getAccess().subscribe(data => {
      this.accessWeb = data['results']['status'];
      this.captionClose = data['results']['caption'];
    }, (error) => {
      console.log('token expired from service access', error.status);
      if (error.status === 401) {

      }
    });
  }

  getMode() {
    this.homeService.getMode().subscribe(data => {
      this.modeWeb = data['results'];
    }, (error) => {
      console.log('token expired from service mode', error.status);
      if (error.status === 401) {
      }
    });
  }

  getSlider() {
    this.homeService.getSlider().subscribe(data => {
      this.sliderItem = data['results'];
    }, (error) => {
      console.log('token expired from service slider', error.status);
      if (error.status === 401) {
      }
    });
  }

  getVideo() {
    this.homeService.getVideo().subscribe(data => {
      this.videoHome = data['results'][0]['value'];
    }, (error) => {
      console.log('token expired from service video', error.status);
      if (error.status === 401) {
      }
    });
  }

  getFavicon() {
    this.homeService.getFavicon().subscribe(data => {
      this.favIcon.href = data['results'][0]['value'];
    }, (error) => {
      console.log('token expired from service favicon', error.status);
      if (error.status === 401) {
      }
    });
  }


  showCheck() {
    this.displayCheck = true;
  }

  checkReset() {
    this.imgKTP = "";
    this.imgKK = "";
    this.showName = "";
    this.showNIK = "";
    this.showKK = "";
    this.showPhone = "";
    this.showProvince = "";
    this.showReason = "";
    this.showGender = "";
    this.showEmail = "";
    this.showCity = "";
    this.showAddress = "";
    this.showReqAcara = "";
    this.showReqSuci = "";
    this.statusAlertType = "";
    this.statusReg = "";
  }
  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
    this.captchaCheck = captchaResponse;
  }
  checkReg(fcheck: NgForm) {
    this.loadingCheck = true;
    this.notFoundCheck = false;
    this.checkReset();
    this.dataCheck = false;
    console.log(fcheck.value);
    this.registerService.getRegister(fcheck.value).subscribe(res => {
      if (res['status'] === true) {
        if (res['results']['valid'] === true) {
          //console.log(res);
          this.dataCheck = true;
          this.loadingCheck = false;

          const data = res['results']['data'];

          this.imgKTP = this.baseUrlAPI + "/upload/peserta/ktp/" + data['ktp_img'];
          this.imgKK = this.baseUrlAPI + "/upload/peserta/kk/" + data['kk_img'];
          this.showName = data['name'];
          this.showNIK = data['nik'];
          this.showKK = data['kk'];
          this.showPhone = data['phone'];
          this.showProvince = data['province'];
          this.showReason = data['reason'];
          this.showGender = data['gender'];
          this.showEmail = data['email'];
          this.showCity = data['city'];
          this.showAddress = data['address'];
          this.showReqAcara = data['request'];
          this.showReqSuci = data['requestr'];
          this.statusAlertType = data['status']['type'];
          this.statusReg = data['status']['message'];
        }
        else {
          this.loadingCheck = false;
          //this.messageService.add({severity:'error', summary:'Error', detail:res['results']['message']});
          this.notFoundCheck = true;
        }
      }
      else {
        this.loadingCheck = false;
        this.messageService.add({ severity: 'error', summary: 'home.alertTitle', detail: 'Unauthorize. Silahkan isi captcha terlebih dahulu.' });
      }
    });
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  indicator(type) {
    switch (type) {
      case 'stop':
        this.disabledStop = true;
        this.disabledPlay = false;
        this.showPlay = true;
        this.showPause = false;
        this.sliderInterval = 0;
        break;
      case 'play':
        this.disabledStop = false;
        this.disabledPlay = true;
        this.showPlay = false;
        this.showPause = true;
        this.sliderInterval = 3000;
        break;

      default:
        break;
    }
  }

  toRegister() {
    this.alertMantap = false;
    if (this.oke == false) {
      this.alertMantap = true;
      this.messageService.add({ severity: 'error', summary: this.translate.instant('home.alertTitle'), detail: this.translate.instant('home.alertRegister') });
    }
    else {
      this.router.navigate(['/registration']);
    }

  }

}
