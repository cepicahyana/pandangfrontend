import { Injectable } from '@angular/core';
import PNotify from 'pnotify/dist/es/PNotify';
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons';
import PNotifyMobile from 'pnotify/dist/es/PNotifyMobile';

@Injectable()
export class PNotifyService {
  getNotif(title:string, msg:string, type:string) {
    PNotifyButtons;
    PNotifyMobile;
    PNotify.defaults.icons = 'fontawesome5';
    PNotify.defaults.styling = 'bootstrap4';
    PNotify.defaults.width = '300px';
    return PNotify.alert({
      title: title,
      text: msg,
      type: type,
      Mobile: {
        swipeDismiss: true,
        styling: true
      }
    });
  }
}
