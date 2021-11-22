import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController} from 'ionic-angular';
import { SendValueProvider } from '../../providers/send-value/send-value'; 
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { IndexForAdminPage } from '../index-for-admin/index-for-admin';

/**
 * Generated class for the MissionCompletePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mission-complete',
  templateUrl: 'mission-complete.html',
})
export class MissionCompletePage {

  datalist: any;
  server: any;
  constructor(public navCtrl: NavController,
              public http: HttpClient,
              public SendValue: SendValueProvider,
              private actionsheetCtrl: ActionSheetController,
              private alertCtrl: AlertController, 
              public navParams: NavParams) {

                this.server = SendValue.server;
  }

  data(){
    this.SendValue.getData('missoincomplete.php').then((result) => {
      console.log(result);
      this.datalist = result;
      },(error)=>{
        console.log(error);
      });}

  gohome(){
    this.navCtrl.setRoot( IndexForAdminPage);
  }

  ionViewDidLoad() {
    this.data();
    console.log('ionViewDidLoad MissionCompletePage');
  }

}
