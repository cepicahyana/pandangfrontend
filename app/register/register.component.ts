import { Component, OnInit, ElementRef, ViewChild, LOCALE_ID, Inject, HostListener } from "@angular/core";
import { NgForm } from '@angular/forms';
import { store } from "../store.service";
import { PNotifyService } from '../pnotify.service';
import { ConfirmationService } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { City } from './city';
import { Country } from './country';
//import * as jsw from 'jwt-simple';
import jwt from 'jsonwebtoken';
import * as _ from 'lodash';

import { RegisterService } from './register.service';
import { HomeService } from '../home/home.service';
import { FileUpload } from 'primeng/fileupload';
import { exists } from 'fs';
import { Router } from "@angular/router";

import { MessageService } from 'primeng/api';
import { AppConfig } from '@environments';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.scss'],
  providers: [MessageService]
})


export class RegisterComponent implements OnInit {
  pnotify = undefined;

  registerForm: boolean = false;
  agreementForm: boolean = true;

  pinkActive: boolean = false;
  cyanActive: boolean = false;


  province: SelectItem[];
  selectProvince: SelectItem[];

  city: SelectItem[];
  selectCity: SelectItem[];

  country: SelectItem[];
  selectCountry: SelectItem[];

  oke: boolean;
  fullname: string;
  nik: string;
  kk: string;
  gender: string;
  phone: string;
  email: string;
  address: string = "";
  visit: string;
  selectedEvent: string[] = [];
  selGender: string;

  uploadKTP: any[] = [];
  uploadKK: any[] = [];

  alertMantap: boolean = false;
  alertVisit: boolean = false;
  alertKTP: boolean = false;
  alertKK: boolean = false;

  vnik: string;
  vemail: string;
  getToken: string = "";

  loadingForm: boolean = false;
  baseUrlAPI: string = AppConfig.baseURL;
  captchaKey: string = AppConfig.captchaKey;

  captcha: string = "";
  captchaCheck: string = "";
  alasanLength: number = 0;
  alamatLength: number = 0;
  alasanMengikuti: string = "";

  phoneModel: string = "";

  displayCheck: boolean = false;
  loadingCheck: boolean = false;
  notFoundCheck: boolean = false;
  alertCaptchaCheck: boolean = false;
  profession: SelectItem[];
  selectProfession: SelectItem[];
  searchNIK: string = "";

  // VARIABLE SHOW DATA
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

  //cam setting
  cam: boolean = false;

  // Mode #2 Variable
  //init setting web
  accessWeb: string = '';
  modeWeb: string = '';
  selectIndo: boolean = false;
  phoneCode: string = null;
  langSetting: string = localStorage.getItem('language');
  captionClose: string = '';

  // profession selected field
  agencyForm: boolean = false;
  mediaForm: boolean = false;
  otherForm: boolean = false;


  background: string = '';
  sliderItem: any[] = [];
  favIcon: HTMLLinkElement = document.querySelector('#favIcon');

  tmpFormZoom: any;
  tokenWeb: string = 'Bearer ' + localStorage.getItem('token');

  @ViewChild('reg') reg: ElementRef;
  @ViewChild('alertAcara') alertAcara: ElementRef;
  @ViewChild('fileKTP') fileKTP: FileUpload;
  @ViewChild('fileKK') fileKK: FileUpload;
  constructor(
    private pnotifyService: PNotifyService,
    private registerService: RegisterService,
    private messageService: MessageService,
    private homeService: HomeService,
    private router: Router,
    private translate: TranslateService


  ) {
    this.pnotify = this.pnotifyService;
    this.getFavicon();
    translate.setDefaultLang(this.langSetting);
  }
  @HostListener('window:scroll')
  ngOnInit() {

    this.country = Country;
    this.province = [
      { label: 'Aceh', value: "11" },
      { label: 'Bali', value: "51" },
      { label: 'Banten', value: "36" },
      { label: 'Bengkulu', value: "17" },
      { label: 'DI Yogyakarta', value: "34" },
      { label: 'DKI Jakarta', value: "31" },
      { label: 'Gorontalo', value: "75" },
      { label: 'Jambi', value: "15" },
      { label: 'Jawa Barat', value: "32" },
      { label: 'Jawa Tengah', value: "33" },
      { label: 'Jawa Timur', value: "35" },
      { label: 'Kalimantan Barat', value: "61" },
      { label: 'Kalimantan Selatan', value: "63" },
      { label: 'Kalimantan Tengah', value: "62" },
      { label: 'Kalimantan Timur', value: "64" },
      { label: 'Kalimantan Utara', value: "65" },
      { label: 'Kepulauan Bangka Belitung', value: "19" },
      { label: 'Kepulauan Riau', value: "21" },
      { label: 'Lampung', value: "18" },
      { label: 'Maluku', value: "81" },
      { label: 'Maluku Utara', value: "82" },
      { label: 'Nusa Tenggara Barat', value: "52" },
      { label: 'Nusa Tenggara Timur', value: "53" },
      { label: 'Papua', value: "92" },
      { label: 'Papua Barat', value: "91" },
      { label: 'Riau', value: "14" },
      { label: 'Sulawesi Barat', value: "76" },
      { label: 'Sulawesi Selatan', value: "73" },
      { label: 'Sulawesi Tengah', value: "72" },
      { label: 'Sulawesi Tenggara', value: "74" },
      { label: 'Sulawesi Utara', value: "71" },
      { label: 'Sumatera Barat', value: "13" },
      { label: 'Sumatera Selatan', value: "16" },
      { label: 'Sumatera Utara', value: "12" },
    ];

    this.city = [];
    const body = { 'foo': 'bar' };
    const token = jwt.sign(body, 'pandangistana75');
    this.getToken = token;

    /*LIST LOAD DATA
      1. ACCESS
      2. MODE
      3. PROFESSION
      4. BACKGROUND
      5. SLIDER
      6. FAVICON
    */
    setTimeout(() => {
      this.getAccess();
      this.getMode();
      this.getProfession();
      this.getBackground();
      this.getSlider();
      this.getFavicon();
    }, 1000);

  }


  checkJob($event) {
    switch ($event.value.id) {
      case "1": //ASN
        this.agencyForm = true;
        this.mediaForm = false;
        this.otherForm = false;
        break;
      case "4": //Media
        this.agencyForm = false;
        this.mediaForm = true;
        this.otherForm = false;
        break;
      case "5": //Other
        this.agencyForm = false;
        this.mediaForm = false;
        this.otherForm = true;
        break;

      default:
        this.agencyForm = false;
        this.mediaForm = false;
        this.otherForm = false;
        break;
    }
  }

  getAccess() {
    this.homeService.getAccess().subscribe(data => {
      this.accessWeb = data['results']['status'];
      this.captionClose = data['results']['caption'];
      if (data['results']['status'] == 'close') {
        this.router.navigate(['/']);
      }
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

  getProfession() {
    this.registerService.getProfesion(this.langSetting).subscribe((data) => {
      console.log(data);
      this.profession = data['results'];
    }, (error) => {
      console.log('token expired from service profession', error.status);
      if (error.status === 401) {
      }
    });
  }

  getBackground() {
    this.registerService.getBackground().subscribe(data => {
      console.log(data);
      this.background = data['results'][0]['value'];
    }, (error) => {
      console.log('token expired from service background', error.status);
      if (error.status === 401) {
      }
    });
  }

  getSlider() {
    this.registerService.getSlider().subscribe(data => {
      this.sliderItem = data['results'];
    }, (error) => {
      console.log('token expired from service slider', error.status);
      if (error.status === 401) {
      }
    });
  }

  getFavicon() {
    this.registerService.getFavicon().subscribe(data => {
      this.favIcon.href = data['results'][0]['value'];

    }, (error) => {
      console.log('token expired from service favicon', error.status);
      if (error.status === 401) {
      }
    });
  }


  checkIndo() {
    this.phoneCode = "+" + this.selectCountry['code'];
    if (this.selectCountry['code'] == "62") {
      this.selectIndo = true;
    } else {
      this.selectIndo = false;
    }
  }



  //cam function
  showCam() {
    this.cam = true;
  }
  hideCam() {
    this.cam = false;
  }

  showCheck() {
    this.displayCheck = true;
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

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

  checkReg(fcheck: NgForm) {
    this.loadingCheck = true;
    this.notFoundCheck = false;
    this.checkReset();
    this.dataCheck = false;
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
        this.messageService.add({ severity: 'error', summary: this.translate.instant('register.alertTitle'), detail: 'Unauthorize. Silahkan isi captcha terlebih dahulu.' });
      }
    });
  }

  errorKTP(event: any) {
    console.log(event.error.status);
    this.messageService.add({ severity: 'error', summary: this.translate.instant('register.alertTitle'), detail: 'File Kartu Tanda Penduduk bukan type Image, Silahkan pilih kembali File yang benar.' });
    this.loadingForm = false;
  }

  errorKK() {
    this.messageService.add({ severity: 'error', summary: this.translate.instant('register.alertTitle'), detail: 'File Kartu Keluarga bukan type Image, Silahkan pilih kembali File yang benar.' });
    this.loadingForm = false;
  }

  resolved(captchaResponse: string) {
    //console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  showToast() {
    this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Via MessageService' });
  }

  onBeforeUpload(event) {

    //event.xhr.setRequestHeader("Authorization", token);
    event.formData.append('kwaci', this.vnik);
    //console.log(event);
    //alert('bf');
  }

  onBeforeUploadZoom(event) {

    //event.xhr.setRequestHeader("Authorization", token);
    event.formData.append('kwaci', this.vemail);
    event.formData.append('lang', this.langSetting);
    //console.log(event);
    //alert('bf');
  }

  onBeforeUploadKK(event) {

    //event.xhr.setRequestHeader("Authorization", token);
    event.formData.append('kwaci', this.vnik);
    //console.log(event);
    //alert('bf');
  }

  postRegisterZoom(f: NgForm) {
    this.tmpFormZoom = f.value;


    setTimeout(() => {
      console.log(this.tmpFormZoom);
    }, 3000);

    this.alertKTP = false;

    let myForm = {
      "form": this.tmpFormZoom,
      "fileKTP": this.fileKTP
    };

    this.loadingForm = true;

    if (myForm.fileKTP._files.length == 0) {
      this.alertKTP = true;
      this.loadingForm = false;
      return false;
    }

    this.processRegisterZoom();
  }

  processRegisterZoom() {

    this.homeService.getToken().subscribe(data => {
      console.log(data);
      localStorage.setItem('token', data['access_token']);
      localStorage.setItem('scope', data['scope']);
      localStorage.setItem('tokenType', data['token_type']);
      localStorage.setItem('expireIn', data['expires_in']);

      this.registerService.postRegisterZoom(this.tmpFormZoom).subscribe(res => {
        if (res['status'] === true) {
          if (res['results']['valid'] === true) {
            this.fileKTP.upload();

          }
          else {
            this.loadingForm = false;
            this.messageService.add({ severity: 'error', summary: this.translate.instant('register.alertTitle'), detail: res['results']['message'] });

          }
        }
        else {
          this.loadingForm = false;
          this.messageService.add({ severity: 'error', summary: this.translate.instant('register.alertTitle'), detail: 'Unauthorize' });
        }
      }, (error) => {
        console.log('token expired from service post register Zoom', error.status);
      });
    });
  }

  postRegister(f: NgForm) {
    console.log(f.value);
    //console.log(this.fileKTP);
    this.alertMantap = false;
    this.alertVisit = false;
    this.alertKTP = false;
    this.alertKK = false;

    //let mamam = _.merge(f.value, this.fileKTP);
    //console.log(f.value);

    let myForm = {
      "form": f.value,
      "fileKTP": this.fileKTP,
      "fileKK": this.fileKK
    };
    //_.set(myForm, 'fileKTP', this.fileKTP);
    //myForm.file = this.fileKTP;
    //console.log(mamam);

    this.loadingForm = true;

    // if(myForm.form.mantap == false || myForm.form.mantap == undefined){
    //   this.reg.nativeElement.scrollIntoView({behavior: 'smooth'});
    //   this.alertMantap = true;
    //   this.loadingForm = false;
    //   return false;
    // }

    if (myForm.form.visit.length == 0) {
      this.alertAcara.nativeElement.scrollIntoView({ behavior: 'smooth' });
      this.alertVisit = true;
      this.loadingForm = false;
      return false;
    }

    if (myForm.fileKTP._files.length == 0) {
      this.alertKTP = true;
      this.loadingForm = false;
      return false;
    }

    if (myForm.fileKK._files.length == 0) {
      this.alertKK = true;
      this.loadingForm = false;
      return false;
    }

    //const FinalForm = JSON.stringify(myForm);


    this.homeService.getToken().subscribe(data => {
      console.log(data);
      localStorage.setItem('token', data['access_token']);
      localStorage.setItem('scope', data['scope']);
      localStorage.setItem('tokenType', data['token_type']);
      localStorage.setItem('expireIn', data['expires_in']);



      this.registerService.postRegister(f.value).subscribe(res => {
        if (res['status'] === true) {
          if (res['results']['valid'] === true) {
            this.fileKTP.upload();
          }
          else {
            this.loadingForm = false;
            this.messageService.add({ severity: 'error', summary: 'Informasi', detail: res['results']['message'] });

          }
        }
        else {
          this.loadingForm = false;
          this.messageService.add({ severity: 'error', summary: 'Informasi', detail: 'Unauthorize' });
        }
      });

    });

  }

  checkAlasanLength() {
    this.alasanLength = this.alasanMengikuti.length;
  }

  checkAlamatLength() {
    this.alamatLength = this.address.length;
  }

  onUploadKK() {
    this.fileKK.upload();
  }

  successNotif(f: NgForm) {
    this.alasanLength = 0;
    f.reset();
    this.selectGender('x');
    this.loadingForm = false;
    this.messageService.add({ severity: 'success', summary: 'Informasi', detail: 'Anda telah berhasil daftar. Silahkan cek Whatsapp & Email Anda untuk informasi lebih lanjut.' });
  }

  successNotifZoom(f: NgForm) {
    this.alasanLength = 0;
    f.reset();
    this.selectGender('x');
    this.loadingForm = false;
    this.otherForm = false;
    this.agencyForm = false;
    this.mediaForm = false;
    this.phoneCode = null;
    this.selectIndo = false;
    this.messageService.add({ severity: 'success', summary: this.translate.instant('register.alertTitle'), detail: this.translate.instant('register.msgSuccess') });
  }

  resetForm(f: NgForm) {

  }


  filCity() {
    this.city = _.filter(City, { 'value': { 'idprov': this.selectProvince } });
  }

  selectGender(g) {
    switch (g) {
      case "l":
        this.pinkActive = false;
        this.cyanActive = true;
        break;
      case "p":
        this.pinkActive = true;
        this.cyanActive = false;
        break;

      default:
        this.pinkActive = false;
        this.cyanActive = false;
        break;
    }
    this.selGender = g;
  }

  accepted() {


    //element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    //document.body.scrollTop = 0;

    if (this.oke === true) {
      this.registerForm = true;
      this.agreementForm = false;
      this.reg.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
    else {
      this.pnotify.getNotif("Informasi", "Harap Disetujui terlebih dahulu !", "error");
    }
  }




}
