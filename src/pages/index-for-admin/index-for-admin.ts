import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddAdminPage } from '../add-admin/add-admin';
import { HomePage } from '../home/home';
import { NotificationPage } from '../notification/notification';
import { AlertController } from 'ionic-angular';
import { HistoryPostPage } from '../history-post/history-post'; 
import { SaveReturnPage } from '../save-return/save-return';
import { WaitPostPage } from '../wait-post/wait-post';
import { MatchPropertyPage } from '../match-property/match-property';

/**
 * Generated class for the IndexForAdminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-index-for-admin',
  templateUrl: 'index-for-admin.html',
})
export class IndexForAdminPage {

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController, 
              public navParams: NavParams) {
  }


  AddAdmin(){
    this.navCtrl.push(AddAdminPage);
  }

  onLogOutClick(){
    const confirm = this.alertCtrl.create({
      title: 'แจ้งเตือน',
      message: 'คุณต้องการออกจากระบบใช่หรือไม่',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.navCtrl.setRoot(HomePage);
          }
        },
        {
          text: 'Cancel',
          handler: () => {
            
          }
        }
      ]
    });
    confirm.present();
  }

  onNotification(){
    this.navCtrl.push(NotificationPage);
  }

  onWaitPost(){
    this.navCtrl.push(WaitPostPage);
  }

  // onHistoryPost(){
  //   this.navCtrl.push(HistoryPostPage);
  // }

  onSaveReturn(){
    this.navCtrl.push(SaveReturnPage);
  }

  onMatch(){
    this.navCtrl.push(MatchPropertyPage);
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad IndexForAdminPage');
  }

}
