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
 * Generated class for the LCardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-l-card',
  templateUrl: 'l-card.html',
})
export class LCardPage {

  datacard = [
    { 
      name: 'บัตร ATM ธ.กรุงเทพ',
      color: 'secondary',
      selected: false
    },
    { 
      name: 'บัตร ATM ธ.กรุงไทย',
      color: 'secondary',
      selected: false
    },
    { 
      name: 'บัตร ATM ธ.กรุงศรีฯ',
      color: 'secondary',
      selected: false
    },
    { 
      name: 'บัตร ATM ธ.กสิกร',
      color: 'secondary',
      selected: false
    },
    { 
      name: 'บัตร ATM ธ.ทหารไทย',
      color: 'secondary',
      selected: false
    },
    { 
      name: 'บัตร ATM ธ.ไทยพาณิชย์',
      color: 'secondary',
      selected: false
    },
    { 
      name: 'บัตร ATM ธ.ออมสิน',
      color: 'secondary',
      selected: false
    },
    { 
      name: 'บัตรเครดิต/เดบิต',
      color: 'secondary',
      selected: false
    },
    { 
      name: 'บัตรประจำตัวนิสิต',
      color: 'secondary',
      selected: false
    },
    { 
      name: 'บัตรประจำตัวประชาชน',
      color: 'secondary',
      selected: false
    },
    { 
      name: 'ใบอนุญาตขับขี่ฯ',
      color: 'secondary',
      selected: false
    },
    { 
      name: 'อื่น ๆ',
      color: 'secondary',
      selected: false
    },
  ]

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
              public actionSheetCtrl: ActionSheetController ) {
        this.postdata.LOwner = "";
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
    console.log(this.datacard);

    let sumdata :string ="" ;
    for (let entry of  this.datacard) {
      if(entry.selected == true ){
        sumdata += entry.name + "\n";
      }
      console.log(sumdata);
      
       }
      
       if(sumdata==""){
        const confirm = this.alertCtrl.create({
          title: 'ข้อความแจ้งเตือน',
          message: 'กรุณาเลือกประเภทของบัตร',
          buttons: [
            {
              text: 'OK',
            }
          ]
        });
        confirm.present();
       }
       else if(this.postdata.LOwner==""){
        const confirm = this.alertCtrl.create({
          title: 'ข้อความแจ้งเตือน',
          message: 'กรุณากรอกข้อมูลที่แสดงความเป็นเจ้าของ หากไม่มีหรือไม่ทราบใส่ -',
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
        DC_Name: this.SendValue.ReturnName(),
        DC_Date: this.SendValue.ReturnDate(),
        DC_Time: this.SendValue.RetrunTime(),
        DC_Location: this.SendValue.RetrunLocation(),
        DC_PropertyType: this.SendValue.Returnproperty(),
        DC_CardType: sumdata,
        DC_Owner: this.postdata.LOwner,
        DC_image: this.cameraData,
        DC_Action: this.SendValue.status(),
        DC_UserID: this.SendValue.user(),
        DC_Status: this.SendValue.statusNo(),
        DC_StPost: this.SendValue.statusPost(),
        DC_StatusProperty: this.SendValue.ReturnStatusProperty(),
        GenLF: this.SendValue.gen(),
        GenBCKO: this.SendValue.ReturnPropertyTypeBCKO()   
      }
      this.SendValue.postData(body,'card.php').subscribe(data => {
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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LCardPage');
  }

}
