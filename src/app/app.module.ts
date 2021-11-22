import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Camera } from '@ionic-native/camera';
import { Headers} from '@angular/http';

import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { AfterLogicPage } from '../pages/after-logic/after-logic';
import { LostPage } from '../pages/lost/lost';
import { FoundPage } from '../pages/found/found';
import { LBagsPage } from '../pages/l-bags/l-bags';
import { LKeysPage } from '../pages/l-keys/l-keys';
import { LCardPage } from '../pages/l-card/l-card';
import { LOtherPage } from '../pages/l-other/l-other';
import { FBagsPage } from '../pages/f-bags/f-bags';
import { FKeysPage } from '../pages/f-keys/f-keys';
import { FCardPage } from '../pages/f-card/f-card';
import { FOtherPage } from '../pages/f-other/f-other';
import { HistoryPage } from '../pages/history/history';
import { SendValueProvider } from '../providers/send-value/send-value';
import { IndexForAdminPage } from '../pages/index-for-admin/index-for-admin';
import { LoginForAdminPage } from '../pages/login-for-admin/login-for-admin';
import { AddAdminPage } from '../pages/add-admin/add-admin';
import { ActionSheet, ActionSheetOptions } from '@ionic-native/action-sheet/ngx';
import { ShowdataProvider } from '../providers/showdata/showdata';
import { NotificationPage } from '../pages/notification/notification';
import { GlobalProvider } from '../providers/global/global';
import { HistoryPostPage } from '../pages/history-post/history-post';
import { SaveReturnPage } from '../pages/save-return/save-return';
import { WaitPostPage } from '../pages/wait-post/wait-post';
import { MissionCompletePage } from '../pages/mission-complete/mission-complete';
import { SaveDataOwnerPage } from '../pages/save-data-owner/save-data-owner';
import { MatchPropertyPage } from '../pages/match-property/match-property';
import { CheckPropertyPage } from '../pages/check-property/check-property';




@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    SignUpPage,
    AfterLogicPage,
    LostPage,
    FoundPage,
    LostPage,
    LBagsPage,
    LKeysPage,
    LCardPage,
    LOtherPage,
    FBagsPage,
    FKeysPage,
    FCardPage,
    FOtherPage,
    HistoryPage,
    IndexForAdminPage,
    LoginForAdminPage,
    AddAdminPage,
    NotificationPage,
    HistoryPostPage,
    SaveReturnPage,
    WaitPostPage,
    MissionCompletePage,
    SaveDataOwnerPage,
    MatchPropertyPage,
    CheckPropertyPage

    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    SignUpPage,
    AfterLogicPage,
    LoginPage,
    FoundPage,
    LostPage,
    LBagsPage,
    LKeysPage,
    LCardPage,
    LOtherPage,
    FBagsPage,
    FKeysPage,
    FCardPage,
    FOtherPage,
    HistoryPage,
    IndexForAdminPage,
    LoginForAdminPage,
    AddAdminPage,
    NotificationPage,
    HistoryPostPage,
    SaveReturnPage,
    WaitPostPage,
    MissionCompletePage,
    SaveDataOwnerPage,
    MatchPropertyPage,
    CheckPropertyPage


  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    ActionSheet,
    SendValueProvider,
    ShowdataProvider,
    GlobalProvider
  ]
})
export class AppModule {}
