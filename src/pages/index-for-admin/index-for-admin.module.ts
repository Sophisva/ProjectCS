import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IndexForAdminPage } from './index-for-admin';

@NgModule({
  declarations: [
    IndexForAdminPage,
  ],
  imports: [
    IonicPageModule.forChild(IndexForAdminPage),
  ],
})
export class IndexForAdminPageModule {}
