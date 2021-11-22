import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginForAdminPage } from './login-for-admin';

@NgModule({
  declarations: [
    LoginForAdminPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginForAdminPage),
  ],
})
export class LoginForAdminPageModule {}
