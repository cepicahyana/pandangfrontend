import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { NgxPayPalModule } from 'ngx-paypal';


import { StoreModule } from '@ngrx/store';

//import {FocusTrapModule} from 'primeng/focustrap';
import { MenuItem } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { CommonModule } from '@angular/common';
import localeid from '@angular/common/locales/id';

import { InMemoryDataService } from './in-memory-data.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PNotifyService } from './pnotify.service';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';

import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { WebcamModule } from 'ngx-webcam';
import { OwlModule } from 'ngx-owl-carousel';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FooterComponent } from 'src/app/footer/footer.component';
import { SimpleScrollSpyModule } from "angular-simple-scroll-spy";
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

registerLocaleData(localeid, 'id');

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgxPayPalModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    InputTextModule,
    InputTextareaModule,
    RadioButtonModule,
    CheckboxModule,
    TableModule, ConfirmDialogModule, DropdownModule, FileUploadModule, ToastModule,
    CommonModule,
    RecaptchaModule,
    RecaptchaFormsModule, // if you need forms support,
    WebcamModule,
    OwlModule,
    MDBBootstrapModule,
    SimpleScrollSpyModule


  ],
  exports: [SimpleScrollSpyModule],
  providers: [PNotifyService, ConfirmationService, { provide: LOCALE_ID, useValue: 'id' }, { provide: 'BASE_URL', useValue: 'http://localhost:4200/' }],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
