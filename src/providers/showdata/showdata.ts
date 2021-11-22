import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http  } from '@angular/http';

@Injectable()
export class ShowdataProvider {

  //url: string = 'http://192.168.43.144/DatabaseLost_Found/history.php';
  private showdata: any;


  constructor(public http: HttpClient,
              public Http: Http) {
    console.log('Hello ShowdataProvider Provider');
  }
  // getdata_bag(){
  //   return new Promise((resolve,reject) =>{
  //     this.Http.get('http://192.168.43.144/DatabaseLost_Found/history_bag.php')
  //     .map(res => res.json())
  //     .subscribe(data => {
  //         resolve(data);
  //     },error => {
  //         reject(error);
  //     })
  //   });
  // }

  // getdata_card(){
  //   return new Promise((resolve,reject) =>{
  //     this.Http.get('http://192.168.43.144/DatabaseLost_Found/history_card.php')
  //     .map(res => res.json())
  //     .subscribe(data => {
  //         resolve(data);
  //     },error => {
  //         reject(error);
  //     })
  //   });
  // }

  // getdata_key(){
  //   return new Promise((resolve,reject) =>{
  //     this.Http.get('http://192.168.43.144/DatabaseLost_Found/history_key.php')
  //     .map(res => res.json())
  //     .subscribe(data => {
  //         resolve(data);
  //     },error => {
  //         reject(error);
  //     })
  //   });
  // }

  // getdata_other(){
  //   return new Promise((resolve,reject) =>{
  //     this.Http.get('http://192.168.43.144/DatabaseLost_Found/history_other.php')
  //     .map(res => res.json())
  //     .subscribe(data => {
  //         resolve(data);
  //     },error => {
  //         reject(error);
  //     })
  //   });
  // }

  // getnotification(){
  //   return new Promise((resolve,reject) =>{
  //     this.Http.get('http://192.168.43.144/DatabaseLost_Found/notification.php')
  //     .map(res => res.json())
  //     .subscribe(data => {
  //         resolve(data);
  //     },error => {
  //         reject(error);
  //     })
  //   });
  // }
}
