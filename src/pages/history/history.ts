import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { SendValueProvider } from '../../providers/send-value/send-value';
import { ShowdataProvider } from '../../providers/showdata/showdata';

/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
  postdata: any = {};
  data1: any;
  datalist: any;
  datalist2: any;
  datalist3: any;
  datalist4: any;
  check: any;
  server: string;
  constructor(public navCtrl: NavController,
              public http: HttpClient,
              public SendValue: SendValueProvider, 
              public navParams: NavParams,
              public Showdata: ShowdataProvider) {
    this.server = SendValue.server;
     // this.navParams.get('UserID');
  }

  // showdata(){
  //   let url = 'http://192.168.43.144/DatabaseLost_Found/history.php';
  //   let postdataset = new FormData();
  //   let courseData:Observable<any> = this.http.post(url,postdataset);
  //   this.http.get('url').subscribe(data =>{
  //     this.data1 = data;
  //   })
  //   }
  

   
  ionViewDidLoad() {

    this.SendValue.getData('history_bag.php?UserID='+this.SendValue.user()).then((result) => {
      console.log(result);
      this.datalist = result;
      },(error)=>{
        console.log("ไม่มีข้อมูลของ"+this.SendValue.user());
      });

    this.SendValue.getData('history_card.php?UserID='+this.SendValue.user()).then((result) => {
      console.log(result);
      this.datalist2 = result;
      },(error)=>{
        console.log("ไม่มีข้อมูลของ"+this.SendValue.user());
      });

    this.SendValue.getData('history_key.php?UserID='+this.SendValue.user()).then((result) => {
      console.log(result);
      this.datalist3 = result;
      },(error)=>{
        console.log("ไม่มีข้อมูลของ"+this.SendValue.user());
      });

    this.SendValue.getData('history_other.php?UserID='+this.SendValue.user()).then((result) => {
      console.log(result);
      this.datalist4 = result;
      },(error)=>{
        console.log("ไม่มีข้อมูลของ"+this.SendValue.user());
      });

    console.log('ionViewDidLoad HistoryPage');
  }

}
