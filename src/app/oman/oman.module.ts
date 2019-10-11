import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OmanPage } from './oman.page';
import { HTTP } from '@ionic-native/http/ngx';

const routes: Routes = [
  {
    path: '',
    component: OmanPage
  }
];

@NgModule({
  imports: [HTTP,
    CommonModule,
   // FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OmanPage]
})
export class OmanPageModule {}
