import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; 
import { User } from '../models/user.model'; 
import { UserR } from '../models/user.model'; 
import { FirestoreService } from '../services/firestore.service'; 
import { InteractionService } from '../services/interaction.service'; 
import { FirestorageService } from '../services/firestorage.service'; 
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  private base64Image : string;
  newFile: any;
  newImage = '';
  newUser: UserR = {
    nombre: null,
    empresa: null,
    email: null,
    password: null,
    uid: null,
    perfil: 'cliente',
    foto: null,
    tel: null,
    cita: false
  }
  user: User = new User();
  constructor(private router: Router,
             private authSvc: AuthService,  
             private registro: FirestoreService,
             private interaction: InteractionService,
             private firestorageSvc: FirestorageService,
             private camera: Camera) {}
  public isLoged : any = false;
ngOnInit(){}
  async onRegister(){
    console.log('datos ->', this.newUser);
    if(this.newUser.nombre == '' || this.newUser.nombre == null || this.newUser.empresa == null || this.newUser.empresa == ''
      || this.newUser.tel == null || this.newUser.tel == '' || this.newUser.foto == null || this.newUser.foto == ''){
        this.interaction.alertCuenta();
        
    }else{
      const usuario = await this.authSvc.onRegister(this.newUser).catch( error =>{
        this.interaction.presentToast('Error');
        console.log('error');
      })
      if(usuario){
        this.interaction.presentLoading();
        const path = 'Usuarios';
        const name = this.newUser.email;
        const id = usuario.user.uid;
        this.newUser.uid = id;
        this.newUser.password = null;
        
        const res = await this.firestorageSvc.uploadImage(this.newFile, path, name);
        this.newUser.foto = res;
        await this.registro.createDoc(this.newUser, path, id);
        this.interaction.closeLoading();
        this.interaction.presentToast('Registrado con exito!');
        this.router.navigateByUrl('/tabs/tab3');
      }
    }
  }
  async newImageUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
        this.newFile = event.target.files[0];
        const reader = new FileReader();
        reader.onload = ((image) => {
            this.newUser.foto = image.target.result as string;
        });
        reader.readAsDataURL(event.target.files[0]);
      }
  }
  takePicture(){
    const options: CameraOptions = {
      quality: 20,
      destinationType: this.camera.DestinationType.DATA_URL,
      saveToPhotoAlbum: true,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
    });
  }
}
