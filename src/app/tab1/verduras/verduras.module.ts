import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerdurasPageRoutingModule } from './verduras-routing.module';

import { VerdurasPage } from './verduras.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerdurasPageRoutingModule
  ],
  declarations: [VerdurasPage]
})
export class VerdurasPageModule {}
