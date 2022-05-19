import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import {AlertController} from '@ionic/angular';
import { FirestoreService } from './firestore.service';
@Injectable({
  providedIn: 'root'
})
export class InteractionService {
  loading: any;
  msg: string;
  constructor(public toastController: ToastController,
               public loadingController: LoadingController,
               private alertCtrl: AlertController,
               private firestore: FirestoreService) { }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Guardando...',
    });
    await this.loading.present();
  }

  async closeLoading() {
    await this.loading.dismiss();
  }

  async alertCuenta(){
    const alertElement = await this.alertCtrl.create({
      header: 'Datos incorrectos o incompletos, vuelve a intentarlo',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel'
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    await alertElement.present();
  }
  
  async alertAdmin(page:string, path:string, id:string){
    if(page == 'inv'){
      this.msg = '¿Desea eliminar este producto?';
    }else if(page == 'cita'){
      this.msg = '¿Ya se hizo esta visita?';
    }
    console.log(this.msg);
    const alert = await this.alertCtrl.create({
      cssClass: 'normal',
      header: 'Advertencia',
      message: this.msg,
      buttons: [
        {
          text: 'cancelar',
          role: 'cancel',
          cssClass: 'normal',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Okay');
            this.firestore.deleteDoc(path, id).then( res => {
              this.presentToast('eliminado con exito');
              this.alertCtrl.dismiss();
            }).catch( error => {
                this.presentToast('no se pude eliminar');
            });
          }
        }
      ]
    });
    await alert.present();
  }
}
