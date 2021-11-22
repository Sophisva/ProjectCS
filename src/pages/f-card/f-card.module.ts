import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FCardPage } from './f-card';

@NgModule({
  declarations: [
    FCardPage,
  ],
  imports: [
    IonicPageModule.forChild(FCardPage),
  ],
})
export class FCardPageModule {}
