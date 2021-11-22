import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoryPostPage } from './history-post';

@NgModule({
  declarations: [
    HistoryPostPage,
  ],
  imports: [
    IonicPageModule.forChild(HistoryPostPage),
  ],
})
export class HistoryPostPageModule {}
