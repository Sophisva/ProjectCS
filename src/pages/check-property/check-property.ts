import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { SendValueProvider } from '../../providers/send-value/send-value';
import { ShowdataProvider } from '../../providers/showdata/showdata';

/**
 * Generated class for the CheckPropertyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-check-property',
  templateUrl: 'check-property.html',
})
export class CheckPropertyPage {
  server: string;
  datalist: any;
  datalist2: any;
  datalist3: any;
  datalist4: any;
  datalist5: any;
  property: any;

  constructor(public navCtrl: NavController,
    public http: HttpClient,
    public SendValue: SendValueProvider, 
    public navParams: NavParams,
    public Showdata: ShowdataProvider) {
    this.server = SendValue.server;
  }

  showcontact(){
  this.SendValue.getData('checkcontactowner.php?UserID='+this.SendValue.ReturnMatchUserID()).then((result) => {
    console.log(result);
    this.datalist = result;
    },(error)=>{
      console.log("ไม่มีข้อมูลของ"+this.SendValue.ReturnMatchUserID());
    }); }

        showPropertyFound_bag(){
          if(this.SendValue.ReturnCheckProperty()=='bag'){
          this.SendValue.getData('checkpropertyfound_bag.php?Property='+this.SendValue.ReturnMatchPropertyLost()).then((result) => {
            console.log(result);
            this.datalist2 = result;
            },(error)=>{
              console.log("ไม่มีข้อมูลของ"+this.SendValue.ReturnMatchUserID());
            }); } }

            showPropertyFound_card(){
              if(this.SendValue.ReturnCheckProperty()=='card'){
              this.SendValue.getData('checkpropertyfound_card.php?Property='+this.SendValue.ReturnMatchPropertyLost()).then((result) => {
                console.log(result);
                this.datalist3 = result;
                },(error)=>{
                  console.log("ไม่มีข้อมูลของ"+this.SendValue.ReturnMatchUserID());
                }); }  }

                showPropertyFound_key(){
                  if(this.SendValue.ReturnCheckProperty()=='key'){
                  this.SendValue.getData('checkpropertyfound_key.php?Property='+this.SendValue.ReturnMatchPropertyLost()).then((result) => {
                    console.log(result);
                    this.datalist4 = result;
                    },(error)=>{
                      console.log("ไม่มีข้อมูลของ"+this.SendValue.ReturnMatchUserID());
                    }); }}
                    
                    showPropertyFound_Other(){
                    if(this.SendValue.ReturnCheckProperty()=='other'){
                    this.SendValue.getData('checkpropertyfound_other.php?Property='+this.SendValue.ReturnMatchPropertyLost()).then((result) => {
                    console.log(result);
                    this.datalist5 = result;
                    },(error)=>{
                    console.log("ไม่มีข้อมูลของ"+this.SendValue.ReturnMatchUserID());
                    }); }}

  ionViewDidLoad() {
    this.showcontact();
    this.showPropertyFound_bag();
    this.showPropertyFound_card();
    this.showPropertyFound_key();
    this.showPropertyFound_Other();
    console.log('ionViewDidLoad CheckPropertyPage');
  }

}
