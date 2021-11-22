import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController} from 'ionic-angular';
import { SendValueProvider } from '../../providers/send-value/send-value'; 
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { MissionCompletePage } from '../mission-complete/mission-complete';
import { SaveDataOwnerPage } from '../save-data-owner/save-data-owner';
import { CheckPropertyPage } from '../check-property/check-property';
/**
 * Generated class for the MatchPropertyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-match-property',
  templateUrl: 'match-property.html',
})
export class MatchPropertyPage {

  datalist: any;
  datalist2: any;
  datalist3: any;
  datalist4: any;
  server: any;
  ReferenceNumber: any;
  UserID: any;
  PropertyLost: any;
  datalist11: any;
  TypeProperty: any;

  constructor(public navCtrl: NavController,
    public http: HttpClient,
    public SendValue: SendValueProvider,
    private actionsheetCtrl: ActionSheetController,
    private alertCtrl: AlertController, 
    public navParams: NavParams) {
    this.server = SendValue.server;
  }

  data_bag(){
    this.SendValue.getData('match_bag.php').then((result) => {
      console.log(result);
      this.datalist = result;
      },(error)=>{
        console.log(error);
      });}

  data_card(){
    this.SendValue.getData('match_card.php').then((result) => {
        console.log(result);
        this.datalist2 = result;
        },(error)=>{
          console.log(error);
        });}

  data_key(){
    this.SendValue.getData('match_key.php').then((result) => {
        console.log(result);
        this.datalist3 = result;
        },(error)=>{
        console.log(error);
        });}
        
  data_other(){
    this.SendValue.getData('match_other.php').then((result) => {
        console.log(result);
        this.datalist4 = result;
        },(error)=>{
        console.log(error);
        });}
  
  displayActionSheet(obj) {
    if(obj.DO_ReferenceNumber != null){
      this.ReferenceNumber = obj.DO_ReferenceNumber;
      this.PropertyLost = obj.DO_Property;
      this.TypeProperty = 'other';
      this.UserID = obj.DO_UserID;
    }
    else if(obj.DB_ReferenceNumber != null){
      this.ReferenceNumber = obj.DB_ReferenceNumber;
      //this.PropertyLost = obj.DB_Property;
      this.TypeProperty = 'bag';
      this.UserID = obj.DB_UserID;
    }
    
    else if(obj.DC_ReferenceNumber != null){
      this.ReferenceNumber = obj.DC_ReferenceNumber;
      //this.PropertyLost = obj.DC_Property;
      this.TypeProperty = 'card';
      this.UserID = obj.DC_UserID;
    }
    
    else if(obj.DK_ReferenceNumber != null){
      this.ReferenceNumber = obj.DK_ReferenceNumber;
      //this.PropertyLost = obj.DK_Property;
      this.TypeProperty = 'key';
      this.UserID = obj.DK_UserID;
    }
    
    this.actionsheetCtrl.create({
        title: "หมายเลขรายการ: " + this.ReferenceNumber,
        buttons: [{
                      text: "ตรวจสอบข้อมูลทรัพย์สินที่พบเจอ",
                      role: "destructive",
                      icon: "person",
                      handler: () => {
                        this.SendValue.Match_PropertyLost(this.PropertyLost);
                        this.SendValue.Match_userID(this.UserID);
                        this.SendValue.propertytype(this.TypeProperty);
                        this.navCtrl.push(CheckPropertyPage);

                      }
                      },{
                      text: "Cancle",
                      icon: "close",
                      role: "cancel",
                      handler: () => { }
                    }
                    ]
                  }).present();    
          }

  ionViewDidLoad() {
    this.data_bag();
    this.data_card();
    this.data_key();
    this.data_other();
    console.log('ionViewDidLoad MatchPropertyPage');
  }

}
