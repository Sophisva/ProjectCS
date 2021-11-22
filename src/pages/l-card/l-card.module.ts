import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LCardPage } from './l-card';

@NgModule({
  declarations: [
    LCardPage,
  ],
  imports: [
    IonicPageModule.forChild(LCardPage),
  ],
})
export class LCardPageModule {}
