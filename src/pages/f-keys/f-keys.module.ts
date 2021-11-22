import { NgModule, Component } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FKeysPage } from './f-keys';

@NgModule({
  declarations: [
    FKeysPage,
  ],
  imports: [
    IonicPageModule.forChild(FKeysPage),
    Component,
  ],
})
export class FKeysPageModule {}
