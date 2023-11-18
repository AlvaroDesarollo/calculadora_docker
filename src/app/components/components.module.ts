import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import {  IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [MenuComponent, HeaderComponent],
  exports: [MenuComponent, HeaderComponent],
  imports: [RouterModule, CommonModule, IonicModule],
  providers:[]
})
export class ComponentsModule {}
