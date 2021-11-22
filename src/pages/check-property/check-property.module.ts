import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckPropertyPage } from './check-property';

@NgModule({
  declarations: [
    CheckPropertyPage,
  ],
  imports: [
    IonicPageModule.forChild(CheckPropertyPage),
  ],
})
export class CheckPropertyPageModule {}
