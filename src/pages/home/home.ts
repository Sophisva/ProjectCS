import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignUpPage } from '../sign-up/sign-up';
import { SendValueProvider } from '../../providers/send-value/send-value';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

          datalist: any;
          server: string;

  constructor(public navCtrl: NavController,
              public SendValue: SendValueProvider) {
                this.server = SendValue.server;
    
  }
  onSignUpClick(){
    this.navCtrl.push(SignUpPage);
    }
  
  feeddata(){
    this.SendValue.getData('post.php').then((result) => {
      console.log(result);
      this.datalist = result;
      },(error)=>{
        console.log(error);
      });}

    ionViewDidLoad() {
        this.feeddata();
        //console.log('ionViewDidLoad NotificationPage');
      }
    

}
