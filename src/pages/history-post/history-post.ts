import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import { SendValueProvider } from '../../providers/send-value/send-value'; 

/**
 * Generated class for the HistoryPostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history-post',
  templateUrl: 'history-post.html',
})
export class HistoryPostPage {

  ReferenceNumber: any;
  searchQuery: string= " ";
  datalist: any;
  server: any;

  constructor(public navCtrl: NavController,
              private actionsheetCtrl: ActionSheetController,
              public SendValue: SendValueProvider,
              private alertCtrl: AlertController, 
              public navParams: NavParams) {

             this.server = SendValue.server;
             this.showhistory();
  }

  showhistory(){
    this.SendValue.getData('historyPostByAdmin.php').then((result) => {
      console.log(result);
      this.datalist = result;
      },(error)=>{
        console.log(error);
      });}

  getItems(ev: any){
    this.showhistory();
    let val = ev.target.value;

    if(val && val.trim() != ''){
      //this.datalist = this.datalist.filter((item)=>{
      this.datalist = this.datalist.filter((item: { toString: () => string; })=>{
        return (item.toString().toLowerCase().indexOf(val.toString().toLowerCase()) > -1);
      })  
    }
  }

  displayActionSheet(obj) {
    this.actionsheetCtrl.create({
          title: "หมายเลขรายการ: " + obj.LAFP_ReferenceNumber,
          buttons: [{
            text: "มีเจ้าของมาติดต่อขอรับทรัพย์สินคืนแล้ว",
            role: "destructive",
            icon: "person",
            handler: () => {
               this.return(obj);
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
              console.log("ไม่อยากจะโชว์ ถ้าไม่โดน console.log",(obj.LAFP_ReferenceNumber+this.SendValue.ReturnAdmin()));
              console.log("WoWWW",this.SendValue.ReturnAdmin());
              this.SendValue.EditData('Editmovement.php?ReferenceNumber='+(obj.LAFP_ReferenceNumber+this.SendValue.ReturnAdmin())).then((result) => {
                console.log("เรียบร้อย");
                if(result){
                  const confirm = this.alertCtrl.create({
                    title: 'ยืนยันการทำรายการ',
                    message: 'การทำงานหมายเลข '+this.ReferenceNumber+'เสร็จสมบูรณ์',
                    buttons: [
                      {
                        text: 'OK',
                        handler: () => {
                          this.showhistory();
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
    this.showhistory();
    console.log('ionViewDidLoad HistoryPostPage');
  }

}
