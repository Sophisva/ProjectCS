import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MatchPropertyPage } from './match-property';

@NgModule({
  declarations: [
    MatchPropertyPage,
  ],
  imports: [
    IonicPageModule.forChild(MatchPropertyPage),
  ],
})
export class MatchPropertyPageModule {}
