import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  SignupData: any = {};

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public http: HttpClient, 
              public alertCtrl: AlertController) {
    this.SignupData.Name = "";
    this.SignupData.LastName = "";
    this.SignupData.NontriCode = "";
    this.SignupData.Password = "";
    this.SignupData.Email = "";
    this.SignupData.Tel = "";
    this.SignupData.Contact = "";
  }

  SignUpClick(){
    let url = 'http://192.168.43.144//DatabaseLost_Found/signup.php';
    let signupdataset = new FormData();
  

    var PhoneNumber = new String(this.SignupData.Tel);
    var lengthPhoneNumber = PhoneNumber.length;

        

    if(this.SignupData.Name =="" || this.SignupData.LastName=="" || this.SignupData.LastName =="" || this.SignupData.Password ==""
        || this.SignupData.Email=="" || this.SignupData.Tel =="" || this.SignupData.Contact == "" ){
      const confirm = this.alertCtrl.create({
        title: 'ข้อความแจ้งเตือน',
        message: 'กรุณากรอกข้อมูลให้ครบถ้วน ',
        buttons: [
          {
            text: 'OK',
            handler: () => { }
          }
        ]
      });
      confirm.present();
      }
      
      else if(lengthPhoneNumber<8 || lengthPhoneNumber>10){
        const confirm = this.alertCtrl.create({
        title: 'ข้อความแจ้งเตือน',
        message: 'กรุณากรอกข้อมูลเบอร์โทรศัพท์ให้ครบถ้วน ',
        buttons: [
          {
            text: 'OK',
            handler: () => { }
          }
        ]
      });
      confirm.present();
      }else {
        
        // if(  ){
        //     const confirm = this.alertCtrl.create({
        //     title: 'ข้อความแจ้งเตือน',
        //     message: 'กรุณากรอกรหัสนนทรีให้ถูกต้อง ถ้ารหัสนนทรีถูกต้องแล้วไม่สามารถสมัครได้ กรุณาติดต่อเจ้าหน้าที่'
        //      });
          
        //   confirm.present();
        // }
        // else {
           console.log("Name:",this.SignupData.Name);
           console.log("Lastname:",this.SignupData.LastName);
           console.log("Username:",this.SignupData.Username);
           console.log("Password:",this.SignupData.Password);
           console.log("E-mail:",this.SignupData.Email);
           console.log("PhoneNumber:",this.SignupData.Tel);
           console.log("Contact:",this.SignupData.Contact);

           signupdataset.append('Name',this.SignupData.Name);
           signupdataset.append('LastName',this.SignupData.LastName);
           signupdataset.append('Username',this.SignupData.Username);
           signupdataset.append('Password',this.SignupData.Password);
           signupdataset.append('Email',this.SignupData.Email);
           signupdataset.append('Tel',this.SignupData.Tel);
           signupdataset.append('Contact',this.SignupData.Contact); 
          

   //   }


    let callback:Observable<any> = this.http.post(url,signupdataset);

    callback.subscribe(call =>{
      if(call.status == 200){
        const confirm = this.alertCtrl.create({
          title: 'ข้อความยืนยัน',
          message: 'การดำเนินการเสร็จสมบูรณ์ Username is  '+this.SignupData.Username,
          buttons: [
            {
              text: 'OK',
              handler: () => {
                console.log('Agree clicked');
                this.navCtrl.setRoot(LoginPage);
              }
            }
          ]
        });
        confirm.present();
      }else{
        const confirm = this.alertCtrl.create({
          title: 'ข้อความแจ้งเตือน',
          message: 'กรุณาเปลี่ยนชื่อผู้ใช้ เนื่องจาก'+this.SignupData.Username+'มีการใช้งานแล้ว',
        });
        confirm.present();
      }
    });

  }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

}
