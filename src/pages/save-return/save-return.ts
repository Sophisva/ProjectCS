import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController} from 'ionic-angular';
import { SendValueProvider } from '../../providers/send-value/send-value'; 
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { MissionCompletePage } from '../mission-complete/mission-complete';
import { SaveDataOwnerPage } from '../save-data-owner/save-data-owner';

/**
 * Generated class for the SaveReturnPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-save-return',
  templateUrl: 'save-return.html',
})
export class SaveReturnPage {

  datalist: any;
  server: any;

  constructor(public navCtrl: NavController,
              public http: HttpClient,
              public SendValue: SendValueProvider,
              private actionsheetCtrl: ActionSheetController,
              private alertCtrl: AlertController, 
              public navParams: NavParams) {
        this.server = SendValue.server;
  }

  data(){
    this.SendValue.getData('save_return.php').then((result) => {
      console.log(result);
      this.datalist = result;
      },(error)=>{
        console.log(error);
      });}

  seccess(){
    this.navCtrl.push(MissionCompletePage);
  }
  
  displayActionSheet(obj) {
    this.actionsheetCtrl.create({
          title: "หมายเลขรายการ: " + obj.LAFP_ReferenceNumber,
              buttons: [{
                text: "มีเจ้าของมาติดต่อขอรับทรัพย์สินคืนแล้ว",
                role: "destructive",
                icon: "person",
                handler: () => {
                   this.SendValue.ReferenceNumber(obj.LAFP_ReferenceNumber);
                   this.navCtrl.push(SaveDataOwnerPage);
                   //this.return(obj);
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
          return(obj){
            const confirm = this.alertCtrl.create({
              title: 'Edit',
              message: 'ทรัพย์สินหมายเลขรายการ: <strong>' + obj.LAFP_ReferenceNumber + "</strong>มีเจ้าของมารับคืนแล้วใช่หรือไม่",
              buttons: [
                {
                  text: 'Yes',
                  handler: () => {
                      console.log("ไม่อยากจะโชว์ ถ้าไม่โดน console.log",obj.LAFP_ReferenceNumber+ this.SendValue.ReturnAdmin());
                      this.SendValue.EditData('EditmovementAndReturnAd.php?ReferenceNumber='+obj.LAFP_ReferenceNumber+ this.SendValue.ReturnAdmin()).then((result) => {
                        console.log("เรียบร้อย");
                        if(result){
                          const confirm = this.alertCtrl.create({
                            title: 'ยืนยันการทำรายการ',
                            message: 'การทำงานหมายเลข '+obj.LAFP_ReferenceNumber+'เสร็จสมบูรณ์',
                            buttons: [
                              {
                                text: 'OK',
                                handler: () => {
                                  this.data();
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
    this.data();
    console.log('ionViewDidLoad SaveReturnPage');
  }

}
