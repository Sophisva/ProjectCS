import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { IndexForAdminPage } from '../index-for-admin/index-for-admin';

/**
 * Generated class for the AddAdminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-admin',
  templateUrl: 'add-admin.html',
})
export class AddAdminPage {

  postdata: any = {};

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public http: HttpClient,
              public alertCtrl: AlertController) {
    this.postdata.Username = "";
    this.postdata.Password = "";
    this.postdata.Name = "";
  }

  AddAdmin(){
    let url = 'http://192.168.43.144/DatabaseLost_Found/AddAdmin.php';
    let postdataset = new FormData();

    if(this.postdata.Username == "" || this.postdata.Password == "" || this.postdata.Name == ""){
      const confirm = this.alertCtrl.create({
        title: 'ข้อความแจ้งเตือน',
        message: 'กรุณากรอกข้อมูลให้ครบถ้วน '
      });
      
      confirm.present();
      }else {

        console.log("Username:",this.postdata.Username);
        console.log("Password:",this.postdata.Password);
        console.log("Name:",this.postdata.Name);

        postdataset.append('Username',this.postdata.Username);
        postdataset.append('Password',this.postdata.Password);
        postdataset.append('Name',this.postdata.Name);
 
      }


    let callback:Observable<any> = this.http.post(url,postdataset);

    callback.subscribe(call =>{
      if(call.status == 200){
        const confirm = this.alertCtrl.create({
          title: 'ข้อความยืนยัน',
          message: 'การดำเนินการเสร็จสมบูรณ์ Username is  '+this.postdata.Username,
          buttons: [
            {
              text: 'OK',
              handler: () => {
                console.log('Agree clicked');
                this.navCtrl.setRoot(IndexForAdminPage);
              }
            }
          ]
        });
        confirm.present();
      }else{
        const confirm = this.alertCtrl.create({
          title: 'ข้อความแจ้งเตือน',
          message: 'Username ซ้ำ',
        });
        confirm.present();
      }
    });
   

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddAdminPage');
  }

}
