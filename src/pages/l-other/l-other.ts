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

/**
 * Generated class for the LOtherPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-l-other',
  templateUrl: 'l-other.html',
})
export class LOtherPage {

  loading: any;
  postdata: any = {};
  image_thumb: any;
  imageData: any;
  image_base64: any;
  cameraData: string = "";
  base64Image: string ;
  image: string;
  alert: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl: AlertController,
    //public http: HttpClient, 
    public http: Http,
    public SendValue: SendValueProvider,
    public loadingCtrl: LoadingController, 
    public camera: Camera,
    public actionSheet: ActionSheet,
    public actionSheetCtrl: ActionSheetController) {

      this.postdata.LPropertyType = "";
      this.postdata.LDetailProperty = "";
      this.cameraData = "";
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

  uploadImg(){
    if(this.postdata.LPropertyType==""){
      const confirm = this.alertCtrl.create({
        title: 'ข้อความแจ้งเตือน',
        message: 'กรุณากรอกประเภทของทรัพย์สิน',
        buttons: [
          {
            text: 'OK',
          }
        ]
      });
      confirm.present();
    }
    else if(this.postdata.LDetailProperty==""){
      const confirm = this.alertCtrl.create({
        title: 'ข้อความแจ้งเตือน',
        message: 'กรุณากรอกรายละเอียดทรัพย์สิน',
        buttons: [
          {
            text: 'OK',
          }
        ]
      });
      confirm.present();
    }
    else if(this.cameraData==""){
      const confirm = this.alertCtrl.create({
        title: 'ข้อความแจ้งเตือน',
        message: 'กรุณาใส่รูปภาพประกอบ',
        buttons: [
          {
            text: 'OK',
          }
        ]
      });
      confirm.present();
    }
    let body = {
      DO_Name: this.SendValue.ReturnName(),
      DO_Date: this.SendValue.ReturnDate(),
      DO_Time: this.SendValue.RetrunTime(),
      DO_Location: this.SendValue.RetrunLocation(),
      DO_PropertyType: this.SendValue.Returnproperty(),
      DO_Property: this.postdata.LPropertyType,
      DO_Detail: this.postdata.LDetailProperty,
      DO_image: this.cameraData,
      DO_Action: this.SendValue.status(),
      DO_UserID: this.SendValue.user(),
      DO_Status: this.SendValue.statusNo(),
      DO_StPost: this.SendValue.statusPost(),
      DO_StatusProperty: this.SendValue.ReturnStatusProperty(),
      GenLF: this.SendValue.gen(),
      GenBCKO: this.SendValue.ReturnPropertyTypeBCKO()
      
    }
    this.SendValue.postData(body,'other.php').subscribe(data => {
      this.alert = data;
      if(this.alert){
      const confirm = this.alertCtrl.create({
        title: "ข้อความยืนยัน",
        message: "การดำเนินการเสร็จสมบูรณ์",
        buttons: ["OK"]
        });
        confirm.present(); 
        this.navCtrl.setRoot(AfterLogicPage);
    }
    });
  }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad LOtherPage');
  }

}
