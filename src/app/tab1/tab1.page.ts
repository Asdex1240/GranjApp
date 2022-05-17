import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Flashlight } from '@awesome-cordova-plugins/flashlight/ngx';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  loged = null;
  isOn: boolean;

  constructor(private router: Router,private fl: Flashlight, private authSvc: AuthService ) {
    this.authSvc.stateUser().subscribe(res =>{
      if(res){
        console.log('Logeado');
        this.loged = true;
      }else{
        console.log('no Logeado');
        this.loged = false;
      }
    })
    }
  fov(frove: string){
    if(frove== 'frutas'){
      this.router.navigate(['tabs/tab1/frutas']);
    }else if(frove== 'verduras'){
      this.router.navigate(['tabs/tab1/verduras']);
    }else if(frove == 'linterna'){
      this.toggleFlash();
    }
  }

  async isAvailable(): Promise<boolean>{
    try{
      return await this.fl.available();
    } catch(e){
      console.log(e);
    }
  }

  async toggleFlash(): Promise<void>{
    try{
      let available = await this.isAvailable();
      if(available){
        await this.fl.toggle();
        this.isOn = !this.isOn;
        console.log(this.isOn);
      } else {
        console.log('No esta disponble la lampara');
      }
    } catch(e){
      console.log(e);
    }
  }

  map(){
    this.router.navigate(['tabs/maps']);
  }

}
