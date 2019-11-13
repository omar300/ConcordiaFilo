import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SearchPage } from './search.page';
import { StoreModule } from '../store/store.module';
import {SearchComponentComponent} from "../search-component/search-component.component"
const routes: Routes = [
  {
    path: '',
    component: SearchPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [SearchPage,SearchComponentComponent]
})
export class SearchPageModule {}