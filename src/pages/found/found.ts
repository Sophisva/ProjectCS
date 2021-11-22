import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { FBagsPage } from '../f-bags/f-bags';
import { FKeysPage } from '../f-keys/f-keys';
import { FCardPage } from '../f-card/f-card';
import { FOtherPage } from '../f-other/f-other';
import { HttpClient } from '@angular/common/http';
import { SendValueProvider } from '../../providers/send-value/send-value';

/**
 * Generated class for the FoundPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-found',
  templateUrl: 'found.html',
})
export class FoundPage {

  postdata: any = {};

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public alertCtrl: AlertController,
              public http: HttpClient,
              public SendValue: SendValueProvider) {
                this.postdata.FName=""; 
                this.postdata.Date="";
                this.postdata.FTime=""; 
                this.postdata.FLocation=""; 
                this.postdata.FPropertyType="";
  }


  

  propertyclick(){
  
    if(this.postdata.FPropertyType == 'B'){
      this.SendValue.PropertyType('Bag');
      this.navCtrl.push(FBagsPage);
    }
    else if(this.postdata.FPropertyType == 'K'){
      this.SendValue.PropertyType('Key');
      this.navCtrl.push(FKeysPage);
    }
    else if(this.postdata.FPropertyType == 'C'){
      this.SendValue.PropertyType('Card');
      this.navCtrl.push(FCardPage);
    } 
    else if(this.postdata.FPropertyType == 'O'){
      this.SendValue.PropertyType('Other');
      this.navCtrl.push(FOtherPage);
    }
    else{
      const confirm = this.alertCtrl.create({
        title: 'ข้อความแจ้งเตือน',
        message: 'กรุณาเลือกประเภททรัพย์สิน',
        buttons: [
          {
            text: 'OK',
          }
        ]
      });
      confirm.present();
    }

    let postdataset = new FormData();
    console.log("Nontricode",this.postdata.FNontriCode);
    console.log("Name",this.postdata.FName);
    console.log("Date",this.postdata.Date);
    console.log("Time",this.postdata.FTime);
    console.log("Location",this.postdata.FLocation);
    console.log("propertyType",this.postdata.FPropertyType);
  }

  sendvalue(){
    const today = new Date().toISOString();
    if(this.postdata.Date > today){
      console.log("พรุ่งนี้ยังมาไม่ถึง");
      const confirm = this.alertCtrl.create({
        title: 'ข้อความแจ้งเตือน',
        message: 'ไม่สามารถเลือกวันที่อนาคตได้',
        buttons: [
          {
            text: 'OK',
          }
        ]
      });
      confirm.present();
    }else{
      if(this.postdata.FName==""){
        const confirm = this.alertCtrl.create({
          title: 'ข้อความแจ้งเตือน',
          message: 'กรุณากรอกข้อมูลชื่อให้เรียบร้อย',
          buttons: [
            {
              text: 'OK',
            }
          ]
        });
        confirm.present();
      }
      else if(this.postdata.Date==""){
        const confirm = this.alertCtrl.create({
          title: 'ข้อความแจ้งเตือน',
          message: 'กรุณากรอกข้อมูลวันที่พบทรัพย์สินให้เรียบร้อย',
          buttons: [
            {
              text: 'OK',
            }
          ]
        });
        confirm.present();
      }
      else if(this.postdata.FTime==""){
        const confirm = this.alertCtrl.create({
          title: 'ข้อความแจ้งเตือน',
          message: 'กรุณากรอกข้อมูลช่วงเวลาที่พบทรัพย์สินให้เรียบร้อย',
          buttons: [
            {
              text: 'OK',
            }
          ]
        });
        confirm.present();
      }
      else if(this.postdata.FLocation==""){
        const confirm = this.alertCtrl.create({
          title: 'ข้อความแจ้งเตือน',
          message: 'กรุณากรอกข้อมูลสถานที่พบทรัพย์สินให้เรียบร้อย',
          buttons: [
            {
              text: 'OK',
            }
          ]
        });
        confirm.present();
      }
      else{
        this.SendValue.receivelost(this.postdata.FName, this.postdata.Date,
                    this.postdata.FTime, this.postdata.FLocation, this.postdata.FPropertyType);
        this.propertyclick();}
      }
    
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad FoundPage');
  }

}
