import { NgModule, Component } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LKeysPage } from './l-keys';

@NgModule({
  declarations: [
    LKeysPage,
  ],
  imports: [
    IonicPageModule.forChild(LKeysPage),
    Component
  ],
})
export class LKeysPageModule {}
