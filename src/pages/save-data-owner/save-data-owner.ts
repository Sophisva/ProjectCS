import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Content, ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AfterLogicPage } from '../after-logic/after-logic';
//import { HttpClient, HttpHandler } from '@angular/common/http';
import { Http } from '@angular/http';
import { SendValueProvider } from '../../providers/send-value/send-value';
import { Observable } from 'rxjs/Observable';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { RequestOptions, Headers} from '@angular/http';
import { ActionSheet, ActionSheetOptions } from '@ionic-native/action-sheet/ngx';
import { MissionCompletePage } from '../mission-complete/mission-complete';
import { IndexForAdminPage } from '../index-for-admin/index-for-admin';

/**
 * Generated class for the SaveDataOwnerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-save-data-owner',
  templateUrl: 'save-data-owner.html',
})
export class SaveDataOwnerPage {

  postdata: any = {};
  imageData: any;
  image_base64: any;
  cameraData: string = "";
  base64Image: string ;
  alert: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public alertCtrl: AlertController,
              public http: Http,
              public SendValue: SendValueProvider,
              public loadingCtrl: LoadingController, 
              public camera: Camera,
              public actionSheet: ActionSheet,
              public actionSheetCtrl: ActionSheetController) {
      this.postdata.Name = "";
      this.postdata.Tel = "";
      this.postdata.Facebook = "";
      this.postdata.IDLine = "";
      this.postdata.Note = "-";
      this.cameraData = "";
      this.postdata.ReferennamberLost  = "0000000000";
  }

  presentActionSheet(){
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Choice Medie',
      buttons: [
        {
          text: 'Camera',
          icon: 'camera',
          handler: () =>{
            this.openCamera();
          }
        },
        {
          text: 'Gallary',
          icon: 'image',
          handler: () =>{
            this.openGallary();
          }
        }    
      ]
    })
    actionSheet.present();
  }

  openCamera(){
    const options: CameraOptions = {
      targetWidth:800,
      targetHeight:900,
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      this.cameraData = imageData;
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      //this.image_base64 = base64Image;
    }, (err) =>{
      });
  }
  openGallary(){
    const options: CameraOptions = {
      targetWidth:800,
      targetHeight:900,
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      this.cameraData = imageData;
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      //this.image_base64 = base64Image;
    }, (err) =>{
      });
  }

  save(){
    if(this.postdata.Name == ""){
      const confirm = this.alertCtrl.create({
        title: 'ข้อความแจ้งเตือน',
        message: 'กรุณากรอกข้อมูลชื่อให้ครบถ้วน ',
        buttons: [
          {
            text: 'OK',
            handler: () => { }
          }
        ]
      });
      confirm.present();
    }else if(this.postdata.Tel==""){
      const confirm = this.alertCtrl.create({
        title: 'ข้อความแจ้งเตือน',
        message: 'กรุณากรอกข้อมูลเบอร์โทรให้ถูกต้อง ',
        buttons: [
          {
            text: 'OK',
            handler: () => { }
          }
        ]
      });
      confirm.present();
    }else if(this.postdata.Facebook==""){
      const confirm = this.alertCtrl.create({
        title: 'ข้อความแจ้งเตือน',
        message: 'กรุณากรอกข้อมูลชื่อบัญชี Facebook ',
        buttons: [
          {
            text: 'OK',
            handler: () => { }
          }
        ]
      });
      confirm.present();
    }else if(this.postdata.IDLine==""){
      const confirm = this.alertCtrl.create({
        title: 'ข้อความแจ้งเตือน',
        message: 'กรุณากรอกข้อมูล ID Line ',
        buttons: [
          {
            text: 'OK',
            handler: () => { }
          }
        ]
      });
      confirm.present();
    }else if(this.cameraData==""){
      const confirm = this.alertCtrl.create({
        title: 'ข้อความแจ้งเตือน',
        message: 'กรุณากรอกข้อมูลเพิ่มรูปถ่ายเพื่อเป็นหลักฐาน',
        buttons: [
          {
            text: 'OK',
            handler: () => { }
          }
        ]
      });
      confirm.present();
    }else{
    let body = {
      PO_Referencenumber: this.SendValue.ReturnReferencenumber(),
      PO_Name: this.postdata.Name,
      PO_Tel: this.postdata.Tel,
      PO_Facebook: this.postdata.Facebook,
      PO_IDLine: this.postdata.IDLine,
      PO_Note: this.postdata.Note,
      PO_Image: this.cameraData
    }
    console.log("ไม่อยากจะโชว์ ถ้าไม่โดน console.log",this.SendValue.ReturnReferencenumber()+this.postdata.ReferennamberLost+ this.SendValue.ReturnAdmin());
    this.SendValue.postDatabyAdmin(body,'propertyowner.php').subscribe(data => {
      this.alert = data;
      if(this.alert){
      const confirm = this.alertCtrl.create({
        title: "ข้อความยืนยัน",
        message: "ทรัพย์สินหมายเลขรายการ: <strong>" + this.SendValue.ReturnReferencenumber() + "</strong>มีเจ้าของมารับคืนแล้วใช่หรือไม่",
        buttons: [
          {
            text: 'Yes',
            handler: () => {
                console.log("ไม่อยากจะโชว์ ถ้าไม่โดน console.log",this.SendValue.ReturnReferencenumber()+this.postdata.ReferennamberLost+ this.SendValue.ReturnAdmin());
                this.SendValue.EditData('Editmovement.php?ReferenceNumber='+this.SendValue.ReturnReferencenumber()+this.postdata.ReferennamberLost+ this.SendValue.ReturnAdmin()).then((result) => {
                  console.log("เรียบร้อย");
                  if(result){
                    const confirm = this.alertCtrl.create({
                      title: 'ยืนยันการทำรายการ',
                      message: 'การทำงานหมายเลข '+this.SendValue.ReturnReferencenumber()+'เสร็จสมบูรณ์',
                      buttons: [
                        {
                          text: 'OK',
                          handler: () => {
                            this.navCtrl.setRoot(IndexForAdminPage);
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
    });}
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SaveDataOwnerPage');
  }

}
