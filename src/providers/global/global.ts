import { Injectable } from '@angular/core';


@Injectable()
export class GlobalProvider {

  //Global Variable
  public baseURLAPI:string = "http://192.168.43.144/DatabaseLost_Found/";
  public authKey:string = "Basic YWRtaW46MTIzNDU2";
  

}
