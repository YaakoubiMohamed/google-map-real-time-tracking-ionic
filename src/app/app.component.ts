import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { environment } from '../environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private oneSignal: OneSignal,
    private translate: TranslateService,
  ) {
    const lng = localStorage.getItem('language');
    if (!lng || lng === null) {
      localStorage.setItem('language', 'en');
    }
    this.translate.use(localStorage.getItem('language'));
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      console.log('appid', environment.onesignal.appId);
      console.log('googlenumnner', environment.onesignal.googleProjectNumber);
      setTimeout(async () => {
        await this.oneSignal.startInit(environment.onesignal.appId, environment.onesignal.googleProjectNumber);
        this.oneSignal.getIds().then((data) => {
          console.log('iddddd', data);
          localStorage.setItem('fcm', data.userId);
        });
        await this.oneSignal.endInit();
      }, 1000);

      this.platform.backButton.subscribe(async () => {
        console.log('asd', this.router.url, 'ad', this.router.isActive('/tabs/', true))
        if (this.router.url.includes('/tabs/') || this.router.url.includes('/login')) {
          navigator['app'].exitApp();
        }
      });
      this.statusBar.backgroundColorByHexString('#ff384c');
      this.splashScreen.hide();
    });
  }
}
