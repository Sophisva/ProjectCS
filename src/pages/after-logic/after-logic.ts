import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LostPage } from '../lost/lost';
import { FoundPage } from '../found/found';
import { HomePage } from '../home/home';
import { HistoryPage } from '../history/history';
import { SendValueProvider } from '../../providers/send-value/send-value';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the AfterLogicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-after-logic',
  templateUrl: 'after-logic.html',
})
export class AfterLogicPage {

  data1 :any;
  data: any;
  test: any;
 
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public http: HttpClient, 
              public SendValue: SendValueProvider) {
        
  }

  StatusL(){
    this.SendValue.action('Lost','L','ยังไม่มีเจ้าของมารับทรัพย์สินคืน','No','Success');
    this.onLostClick();
  }
  onLostClick(){
    this.navCtrl.push(LostPage);
    }

  StatusF(){
    this.SendValue.action('Found','F','ยังไม่มีเจ้าของมารับทรัพย์สินคืน','No','Unsuccessful'); 
    this.onFoundClick();
  }
  onFoundClick(){
    this.navCtrl.push(FoundPage);
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

  onHistioryClick(){ 
    // const test =  this.navParams.get('UserID');
     //this.CheckUsername_Bag();
    //  console.log("id : "+ test)
     console.log("แสดงค่าที่ดึงมาจาก ID",this.SendValue.user());
     this.navCtrl.push(HistoryPage);
   
  }
  
  CheckUsername_Bag(){
      // let url = 'http://192.168.43.144/DatabaseLost_Found/history_bag.php';
      // let postdataset = new FormData();
      // postdataset.append('UserID',this.SendValue.user());
      // let courseData:Observable<any>=this.http.post(url,postdataset);
     
      // console.log("แสดงค่าที่ดึงมาจาก Username",this.SendValue.user());
      // courseData.subscribe(call =>{
      //  console.log(call.courseData);     
      //  const data = JSON.stringify(call.courseData)
      //  this.test = data ;
      //  console.log("5555555555555")
      //  console.log(data)
      // });
      
      // this.SendValue.getData('history_bag.php?UserID='+this.SendValue.user()).then((result) => {
      //   console.log(result);
      //   this.SendValue.getDatabase_filter(result);
      //   },(error)=>{
      //     console.log(error);
      //   });
      
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AfterLogicPage');
    console.log(this.test) 
  }
}
