import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignUpPage } from '../sign-up/sign-up';
import { AfterLogicPage } from '../after-logic/after-logic';
import { AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SendValueProvider } from '../../providers/send-value/send-value';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  login:any = {};


  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public alertCtrl: AlertController, 
              public http: Http,
              public SendValue: SendValueProvider) {
    this.login.Username = "";
    this.login.Password = "";
  }

  onSignUpClick(){
    this.navCtrl.push(SignUpPage);
  }

  //user = this.login.Username;
  senduser(){
    
    this.SendValue.login(this.login.Username);
    this.onAfterLoginClick();
  }

  onclear(){
    this.login.Username = "";
    this.login.Password = "";
  }

  onAfterLoginClick(){
    if(this.login.Username != "" && this.login.Password != ""){
      console.log("Username:",this.login.Username);
      console.log("Password:",this.login.Password);

        let url: string = "http://192.168.43.144/DatabaseLost_Found/login.php";
        let dataPost = JSON.stringify({
            user:this.login.Username,
            pass:this.login.Password
        });

        
        this.http.post(url,dataPost).map(res => res.json()).subscribe(
          data => {   
            // console.log(data);
            if( data == 'true'){
              console.log('กำลังเข้าสู่ระบบ');
              this.navCtrl.setRoot(AfterLogicPage);
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
    console.log('ionViewDidLoad LoginPage');
  }

}
