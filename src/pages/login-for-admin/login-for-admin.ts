import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { AlertController } from 'ionic-angular';
import { IndexForAdminPage } from '../index-for-admin/index-for-admin';
import { SendValueProvider } from '../../providers/send-value/send-value';
/**
 * Generated class for the LoginForAdminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login-for-admin',
  templateUrl: 'login-for-admin.html',
})
export class LoginForAdminPage {

  loginbyadmin:any = {};

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public SendValue: SendValueProvider, 
              public http: Http) {

    this.loginbyadmin.Username = "";
    this.loginbyadmin.Password = "";
  }

  onclear(){
    this.loginbyadmin.Username = "";
    this.loginbyadmin.Password = "";
  }

  onIndexForAdmin(){
    if(this.loginbyadmin.Username != "" && this.loginbyadmin.Password != ""){
      console.log("Username:",this.loginbyadmin.Username);
      console.log("Password:",this.loginbyadmin.Password);

        let url: string = "http://192.168.43.144/DatabaseLost_Found/loginAdmin.php";
        let dataPost = JSON.stringify({
            user:this.loginbyadmin.Username,
            pass:this.loginbyadmin.Password
        });

        
        this.http.post(url,dataPost).map(res => res.json()).subscribe(
          data => {   
            // console.log(data);
            if( data == 'true'){
              console.log('กำลังเข้าสู่ระบบ');
              console.log(this.loginbyadmin.Username);
              this.SendValue.admin(this.loginbyadmin.Username);              
              this.navCtrl.setRoot(IndexForAdminPage);
            }else{
              const confirm = this.alertCtrl.create({
                title: 'แจ้งเตือน',
                message: 'กรุณาตรวจสอบความถูกต้อง Username และ Password',
                buttons: [
                  {
                    text: 'OK',
                    handler: () => {
                      console.log('Agree clicked');
                    }
                  }
                ]
              });
              confirm.present();
            }

          });

  
    }else{
      const confirm = this.alertCtrl.create({
        title: 'แจ้งเตือน',
        message: 'กรุณากรอก Username และ Password ให้ครบถ้วน',
        buttons: [
          {
            text: 'OK',
            handler: () => {
              console.log('Agree clicked');
            }
          }
        ]
      });
      confirm.present();
    }

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginForAdminPage');
  }

}
