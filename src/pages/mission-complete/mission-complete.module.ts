import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MissionCompletePage } from './mission-complete';

@NgModule({
  declarations: [
    MissionCompletePage,
  ],
  imports: [
    IonicPageModule.forChild(MissionCompletePage),
  ],
})
export class MissionCompletePageModule {}
