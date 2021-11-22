import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestOptions } from '@angular/http';
import { Http, Headers } from '@angular/http';
import { GlobalProvider } from '../../providers/global/global';
import { ToastController } from 'ionic-angular'
import 'rxjs/add/operator/map';
import { from } from 'rxjs/observable/from';

/*
  Generated class for the SendValueProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SendValueProvider {

  private username: any;
  private Admin: any;
  private statuss: any; 
  //private NontriCode: any;
  private Name: any;
  private Date: any;
  private Time: any;
  private Location: any;
  private Gen: any;
  private Propertytype: any;
  private Status: any;
  private Property_Type: any;
  private Post: any;
  private StatusProperty: any;
  private Reference: any;
  private Match_Property: any;
  private Match_UserID: any;
  private Property: any;


  private showdata: any;
  baseUrl:any;

  server: string = "http://192.168.43.144/DatabaseLost_Found/";
 
  constructor(public http: HttpClient,
              public Http: Http,
              public global: GlobalProvider,
              public toast: ToastController) {
                this.baseUrl = this.global.baseURLAPI;
    
  }

  Match_PropertyLost(Property: any){
      this.Match_Property = Property;
  }
  ReturnMatchPropertyLost(){
    return this.Match_Property;
  }

  Match_userID(userid: any){
      this.Match_UserID = userid;
  }
  ReturnMatchUserID(){
    return this.Match_UserID;
  }
  
  login(user: any){
      this.username = user;
  }
  user(){
    return this.username;
  }

  admin(admin: any){
    this.Admin = admin;
  }
  ReturnAdmin(){
     return this.Admin;
  }

  PropertyType(propertytype: any){
      this.Property_Type = propertytype;
  }
  Returnproperty(){
      return this.Property_Type;
  }

  action(statusaction: any, gen: any, statusno: any, statusPost: any, statusProperty: any){
      this.statuss = statusaction;
      this.Gen = gen;
      this.Status = statusno;
      this.Post = statusPost;
      this.StatusProperty = statusProperty;
  }
  status(){
    return this.statuss;
  }
  gen(){
    return this.Gen;
  }

  statusNo(){
    return this.Status;
  }

  statusPost(){
    return this.Post;
  }

  ReturnStatusProperty(){
    return this.StatusProperty;
  }

  ReferenceNumber(reference: any){
    this.Reference = reference;
  }

  ReturnReferencenumber(){
    return this.Reference;
  }

  propertytype(property: any){
     this.Property = property;
  }
  ReturnCheckProperty(){
    return this.Property;
  }

  receivelost(name: any, date: any, time: any, location: any, propertytype: any){
    //this.NontriCode = nontri;
    this.Name = name;
    this.Date = date;
    this.Time = time;
    this.Location = location;
    this.Propertytype = propertytype;
  }

  //ReturnNontriCode(){ return this.NontriCode; }
  ReturnName(){ return this.Name; }
  ReturnDate(){ return this.Date; }
  RetrunTime(){ return this.Time; }
  RetrunLocation(){ return this.Location; }
  ReturnPropertyTypeBCKO(){ return this.Propertytype; }

  postData(body, file){
    let type = "application/json; charset=UTF-8";
    let haders = new Headers({'content-Type': type});
    let options = new RequestOptions({ headers: haders });
    return this.Http.post(this.server + file, JSON.stringify(body),options)
    .map(res => res.json());
  }
  postDatabyAdmin(body, file){
    let type = "application/json; charset=UTF-8";
    let haders = new Headers({'content-Type': type});
    let options = new RequestOptions({ headers: haders });
    return this.Http.post(this.server + file, JSON.stringify(body),options)
    .map(res => res);
  }

  getData(segment){
    return new Promise((resolve, reject) => {
      // Header
      let headers = new Headers();
      headers.append('Authorization',this.global.authKey);
      headers.append('Content-Type','application/json');
  
      this.Http.get(this.baseUrl+segment,{headers:headers})
      .subscribe(res=>{
        resolve(res.json());
      },(err)=>{
        if(err.status==0){
            this.toast.create({
              message: 'มีข้อผิดพลาดติดต่อ API ไม่ได้',
              duration: 3000
            }).present();
        }
        reject(err);
      });
    });
  }

  // showData(){
  //   return new Promise((resolve, reject) => {
  //     // Header
  //     let headers = new Headers();
  //     headers.append('Authorization',this.global.authKey);
  //     headers.append('Content-Type','application/json');
  
  //     this.Http.get(this.baseUrl,{headers:headers})
  //     .subscribe(res=>{
  //       resolve(res.json());
  //     },(err)=>{
  //       if(err.status==0){
  //           this.toast.create({
  //             message: 'มีข้อผิดพลาดติดต่อ API ไม่ได้',
  //             duration: 3000
  //           }).present();
  //       }
  //       reject(err);
  //     });
  //   });
  // }

  DeleteData(segment){
    return new Promise((resolve, reject) => {
      // Header
      let headers = new Headers();
      headers.append('Authorization',this.global.authKey);
      headers.append('Content-Type','application/json');
  
      this.Http.get(this.baseUrl+segment,{headers:headers})
      .subscribe(res=>{
        resolve(res);
      },(err)=>{
        if(err.status==0){
            this.toast.create({
              message: 'มีข้อผิดพลาดติดต่อ API ไม่ได้',
              duration: 3000
            }).present();
        }
        reject(err);
      });
    });
  }

  EditData(segment){
    return new Promise((resolve, reject) => {
      // Header
      let headers = new Headers();
      headers.append('Authorization',this.global.authKey);
      headers.append('Content-Type','application/json');
  
      this.Http.get(this.baseUrl+segment,{headers:headers})
      .subscribe(res=>{
        resolve(res);
      },(err)=>{
        if(err.status==0){
            this.toast.create({
              message: 'มีข้อผิดพลาดติดต่อ API ไม่ได้',
              duration: 3000
            }).present();
        }
        reject(err);
      });
    });
  }
  
  UpdateStatus(segment){
    return new Promise((resolve, reject) => {
      // Header
      let headers = new Headers();
      headers.append('Authorization',this.global.authKey);
      headers.append('Content-Type','application/json');
      console.log("111");
  
      this.Http.get(this.baseUrl+segment,{headers:headers})
      .subscribe(res=>{
        resolve(res);
      },(err)=>{
        if(err.status==0){
            this.toast.create({
              message: 'มีข้อผิดพลาดติดต่อ API ไม่ได้',
              duration: 3000
            }).present();
        }
        reject(err);
      });
    });
  }
  

}
