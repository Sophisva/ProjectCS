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
 * Generated class for the LKeysPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-l-keys',
  templateUrl: 'l-keys.html',
})
export class LKeysPage {

  datakey = [
    {
      name: 'กุญแจรถยนต์',
      color: 'Warning',
      selected: false
    },
    {
      name: 'กุญแจรถจักรยานยนต์',
      color: 'Warning',
      selected: false
    },
    {
      name: 'กุญแจห้อง',
      color: 'Warning',
      selected: false
    },
    {
      name: 'ไม่ทราบชนิดลูกกุญแจ',
      color: 'Warning',
      selected: false
    }
  ];

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
                
              this.postdata.LSymbol = "";
              this.cameraData = "";

  }

  onClick( check ){
    console.log(check);
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

    console.log(this.datakey);
    //this.datakey
    let sumdata :string ="" ;
    for (let entry of  this.datakey) {
    
      if(entry.selected == true ){
        sumdata += entry.name + "\n";
      }
      console.log(sumdata);
      
       }
    
       if(sumdata==""){
        const confirm = this.alertCtrl.create({
          title: 'ข้อความแจ้งเตือน',
          message: 'กรุณาเลือกชนิดกุญแจ',
          buttons: [
            {
              text: 'OK',
            }
          ]
        });
        confirm.present();
       }
       else if(this.postdata.LSymbol==""){
        const confirm = this.alertCtrl.create({
          title: 'ข้อความแจ้งเตือน',
          message: 'กรุณากรอกข้อมูลที่เป็นเอกลักษณ์ หรือสิ่งที่แสดงความเป็นเจ้าของ หากไม่มีหรือไม่ทราบใส่ -',
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
        DK_Name: this.SendValue.ReturnName(),
        DK_Date: this.SendValue.ReturnDate(),
        DK_Time: this.SendValue.RetrunTime(),
        DK_Location: this.SendValue.RetrunLocation(),
        DK_PropertyType: this.SendValue.Returnproperty(),
        DK_KeyType: sumdata,
        DK_Symbol: this.postdata.LSymbol,
        DK_Image: this.cameraData,
        DK_Action: this.SendValue.status(),
        DK_UserID: this.SendValue.user(),
        DK_Status: this.SendValue.statusNo(),
        DK_StPost: this.SendValue.statusPost(),
        DK_StatusProperty: this.SendValue.ReturnStatusProperty(),
        GenLF: this.SendValue.gen(),
        GenBCKO: this.SendValue.ReturnPropertyTypeBCKO()   
      }

      this.SendValue.postData(body,'key.php').subscribe(data => {
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
    console.log('ionViewDidLoad LKeysPage');
  }

}
