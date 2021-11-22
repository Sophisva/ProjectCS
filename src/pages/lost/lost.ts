import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AfterLogicPage } from '../after-logic/after-logic';
import { LBagsPage } from '../l-bags/l-bags';
import { LKeysPage } from '../l-keys/l-keys';
import { LCardPage } from '../l-card/l-card';
import { LOtherPage } from '../l-other/l-other';
import { HttpClient } from '@angular/common/http';
import { SendValueProvider } from '../../providers/send-value/send-value';

/**
 * Generated class for the LostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lost',
  templateUrl: 'lost.html',
})
export class LostPage {

  postdata: any = {};

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public alertCtrl: AlertController, 
              public http: HttpClient,
              public SendValue: SendValueProvider ) {
              this.postdata.LName= "";
              this.postdata.Date= "";
              this.postdata.LTime= "";
              this.postdata.LLocation= "";
              this.postdata.LPropertyType= "";
  } 

  propertyclick(){
    if(this.postdata.LPropertyType == 'B'){
      this.SendValue.PropertyType('Bag');
      this.navCtrl.push(LBagsPage);
    }
    else if(this.postdata.LPropertyType == 'K'){
      this.SendValue.PropertyType('Key');
      this.navCtrl.push(LKeysPage);
    }
    else if(this.postdata.LPropertyType == 'C'){
      this.SendValue.PropertyType('Card');
      this.navCtrl.push(LCardPage);
    } 
    else if(this.postdata.LPropertyType == 'O'){
      this.SendValue.PropertyType('Other');
      this.navCtrl.push(LOtherPage);
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
    console.log("Name",this.postdata.LName);
    console.log("Date",this.postdata.Date);
    console.log("Time",this.postdata.LTime);
    console.log("Location",this.postdata.LLocation);
    console.log("propertyType",this.postdata.LPropertyType);  
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
    if(this.postdata.LName == ""){
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
    else if(this.postdata.Date == ""){
      const confirm = this.alertCtrl.create({
        title: 'ข้อความแจ้งเตือน',
        message: 'กรุณากรอกข้อมูลวันที่ทำทรัพย์สินสูญหายให้เรียบร้อย',
        buttons: [
          {
            text: 'OK',
          }
        ]
      });
      confirm.present();
    }
    else if(this.postdata.LTime == ""){
      const confirm = this.alertCtrl.create({
        title: 'ข้อความแจ้งเตือน',
        message: 'กรุณากรอกข้อมูลช่วงเวลาทำทรัพย์สินสูญหายให้เรียบร้อย',
        buttons: [
          {
            text: 'OK',
          }
        ]
      });
      confirm.present();
    }
    else if(this.postdata.LLocation == ""){
      const confirm = this.alertCtrl.create({
        title: 'ข้อความแจ้งเตือน',
        message: 'กรุณากรอกข้อมูลสถานที่ทำทรัพย์สินสูญหายให้เรียบร้อย',
        buttons: [
          {
            text: 'OK',
          }
        ]
      });
      confirm.present();
    }
    else{
      this.SendValue.receivelost(this.postdata.LName, this.postdata.Date,
                               this.postdata.LTime, this.postdata.LLocation, this.postdata.LPropertyType);
      this.propertyclick();
    }

    
    }
  }

}
