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
 * Generated class for the LBagsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-l-bags',
  templateUrl: 'l-bags.html',
})
export class LBagsPage {

  postdata: any = {};
  loading: any;
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
    public actionSheet: ActionSheet,
    public loadingCtrl: LoadingController, 
    public camera: Camera,
    public actionSheetCtrl: ActionSheetController, 
    public SendValue: SendValueProvider) {
      this.postdata.LBagsType = "";
      this.postdata.LBageBrand = "";
      this.postdata.LMaterialags = "";
      this.postdata.LCoLorBags = "";
      this.postdata.LBageDetail = "";
  }

  presentActionSheet(){
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Choice Medie',
      buttons: [
        {
          text: 'Camera',
          icon: 'camera',
          handler: () =>{
          //console.log(this.openCamera());
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
     if(this.postdata.LBagsType==""){
      const confirm = this.alertCtrl.create({
        title: 'ข้อความแจ้งเตือน',
        message: 'กรุณาเลือกประเภทกระเป๋าให้เรียบร้อย',
        buttons: [
          {
            text: 'OK',
          }
        ]
      });
      confirm.present();
     }
     else if(this.postdata.LBageBrand==""){
      const confirm = this.alertCtrl.create({
        title: 'ข้อความแจ้งเตือน',
        message: 'กรุณาระบุแบรนด์กระเป๋าให้เรียบร้อย หากไม่ทราบกรุณาใส่ -',
        buttons: [
          {
            text: 'OK',
          }
        ]
      });
      confirm.present();
    }
    else if(this.postdata.LMaterialags==""){
      const confirm = this.alertCtrl.create({
        title: 'ข้อความแจ้งเตือน',
        message: 'กรุณาเลือกวัสดุที่ใช้ผลิตกระเป๋า',
        buttons: [
          {
            text: 'OK',
          }
        ]
      });
      confirm.present();
    }
    else if(this.postdata.LCoLorBags==""){
      const confirm = this.alertCtrl.create({
        title: 'ข้อความแจ้งเตือน',
        message: 'กรุณาเลือกสีกระเป๋า',
        buttons: [
          {
            text: 'OK',
          }
        ]
      });
      confirm.present();
    }
    else if(this.postdata.LBageDetail==""){
      const confirm = this.alertCtrl.create({
        title: 'ข้อความแจ้งเตือน',
        message: 'กรุณากรอกข้อมูลทรัพย์สิน/สิ่งของที่อยู่ภายในกระเป๋า หากไม่ทราบใส่ -',
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
    else{
    let body = {
      DB_Name: this.SendValue.ReturnName(),
      DB_Date: this.SendValue.ReturnDate(),
      DB_Time: this.SendValue.RetrunTime(),
      DB_Location: this.SendValue.RetrunLocation(),
      DB_PropertyType: this.SendValue.Returnproperty(),
      DB_BagType: this.postdata.LBagsType,
      DB_Brand: this.postdata.LBageBrand,
      DB_Material: this.postdata.LMaterialags,
      DB_Color: this.postdata.LCoLorBags,
      DB_Detail: this.postdata.LBageDetail,
      DB_image: this.cameraData,
      DB_Action: this.SendValue.status(),
      DB_UserID: this.SendValue.user(),
      DB_Status: this.SendValue.statusNo(),
      DB_StPost: this.SendValue.statusPost(),
      DB_StatusProperty: this.SendValue.ReturnStatusProperty(),
      GenLF: this.SendValue.gen(),
      GenBCKO: this.SendValue.ReturnPropertyTypeBCKO() 
    }
    this.SendValue.postData(body,'bag.php').subscribe(data => {
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
  }}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LBagsPage');
  }

}
