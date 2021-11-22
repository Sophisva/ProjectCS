import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController} from 'ionic-angular';
import { SendValueProvider } from '../../providers/send-value/send-value'; 
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',

})
export class NotificationPage {
  data2: any;
  datalist: any;
  datalist2: any;
  datalist3: any;
  datalist4: any;
  server: string;
  al: any;
  ReferenceNumber: any;
  PropertyType: any;
  Image: any;
  Action: any;
  Byadmin: any;

  constructor(public navCtrl: NavController,
              public http: HttpClient,
              public SendValue: SendValueProvider,
              private actionsheetCtrl: ActionSheetController,
              private alertCtrl: AlertController, 
              public navParams: NavParams) {
        this.server = SendValue.server;
  }

feeddata(){
    this.SendValue.getData('notification.php').then((result) => {
      console.log(result);
      this.datalist = result;
      },(error)=>{
        console.log(error);
      });}
    
displayActionSheet(obj) {
    if(obj.DB_ReferenceNumber!=null){
      this.ReferenceNumber = obj.DB_ReferenceNumber;
      this.PropertyType = obj.DB_PropertyType;
      this.Image = obj.DB_Image;
      this.Action = obj.DB_Action;
    }
    else if(obj.DC_ReferenceNumber!=null){
      this.ReferenceNumber = obj.DC_ReferenceNumber;
      this.PropertyType = obj.DC_PropertyType;
      this.Image = obj.DC_Image;
      this.Action = obj.DC_Action;
    }
    else if(obj.DK_ReferenceNumber!=null){
      this.ReferenceNumber = obj.DK_ReferenceNumber;
      this.PropertyType = obj.DK_PropertyType;
      this.Image = obj.DK_Image;
      this.Action = obj.DK_Action;
    }
    else{
      this.ReferenceNumber = obj.DO_ReferenceNumber;
      this.PropertyType = obj.DO_PropertyType;
      this.Image = obj.DO_image;
      this.Action = obj.DO_Action;
    }
    this.actionsheetCtrl.create({
          title: "หมายเลขรายการ: " + this.ReferenceNumber,
          buttons: [{
            text: "Confirm",
            role: "destructive",
            icon: "archive",
            handler: () => {
               this.confirm();
            }
          }, {
            text: "Delete",
            role: "destructive",
            icon: "trash",
            handler: () => {
              this.deleteDocument();
            }
          }, {
            text: "Cancle",
            icon: "close",
            role: "cancel",
            handler: () => { }
          }
          ]
        }).present();
      }

      deleteDocument(){
        const confirm = this.alertCtrl.create({
          title: 'Delecte',
          message: 'คุณต้องการลบข้อมูลหมายเลขรายการ: <strong>' + this.ReferenceNumber + "</strong>ใช่หรือไม่",
          buttons: [
            {
              text: 'Yes',
              handler: () => {
                  console.log("ไม่อยากจะโชว์ ถ้าไม่โดน console.log",this.ReferenceNumber);
                  this.SendValue.DeleteData('DeleteRecord.php?ReferenceNumber='+this.ReferenceNumber).then((result) => {
                    console.log("ลบข้อมูลเรียบร้อย");
                    if(result){
                      const confirm = this.alertCtrl.create({
                        title: 'ยืนยันการลบข้อมูล',
                        message: 'ข้อมูลหมายเลขรายการ '+this.ReferenceNumber+'ถูกลบเรียบร้อย',
                        buttons: [
                          {
                            text: 'OK',
                            handler: () => {
                              this.feeddata();
                            }
                          }
                        ]
                      });
                      confirm.present();
                    }
                  });
              }
            },
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                console.log('Remove Cancelled!');
              }
            }
          ]
        });
        confirm.present();
      }

      confirm(){
        const confirm = this.alertCtrl.create({
          title: 'Confirm',
          message: 'ผู้แจ้งหมายเลขรายการ: <strong>' + this.ReferenceNumber + "</strong>ได้นำทรัพย์สินมาส่งให้เจ้าหน้าที่แล้วใช่หรือไม่",
          buttons: [
            {
              text: 'Yes',
              handler: () => {
                  console.log("ไม่อยากจะโชว์ ถ้าไม่โดน console.log",this.ReferenceNumber);
                  this.SendValue.EditData('UpdateUnseccessToSeccess.php?ReferenceNumber='+this.ReferenceNumber).then((result) => {
                    if(result){
                      const confirm = this.alertCtrl.create({
                        title: 'ยืนยันข้อมูล',
                        message: 'ได้รับทรัพย์สินหมายเลขรายการ '+this.ReferenceNumber+'เรียบร้อย',
                        buttons: [
                          {
                            text: 'OK',
                            handler: () => {
                              this.feeddata();
                            }
                          }
                        ]
                      });
                      confirm.present();
                    }
                  });
                  
              }
            },
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                console.log('Remove Cancelled!');
              }
            }
          ]
        });
        confirm.present();
      }

  ionViewDidLoad() {
    this.feeddata();
    console.log('ionViewDidLoad NotificationPage');
  }

}
