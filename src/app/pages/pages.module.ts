import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { IonicModule } from '@ionic/angular';
import { PagesRoutingModule } from './pages-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { PetitionsService } from '../services/petitions.service';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class PagesModule {}
