import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UserR } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { Cita } from 'src/app/models/cita.model';
import { InteractionService } from 'src/app/services/interaction.service';
@Component({
  selector: 'app-citas',
  templateUrl: './citas.page.html',
  styleUrls: ['./citas.page.scss'],
})
export class CitasPage implements OnInit {
  loading: any;
  //Datos del usuario
  perfil: 'admin' | 'cliente' = null;
  nombre: string;
  foto: string;
  empresa: string;
  telefono: string;
  id: string;
  //Fin datos del usuario
  public dia: number[]=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
  public mes: string[]=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto',
                        'Septiembre','Octubre','Noviembre','Diciembre'];
  //Datos Cita
  private path = 'Citas/';
  private pathUser = 'Usuarios/';
  enableNewCita = false;
  public selectedValue: 1;
  Citas: Cita[] = [];
  User: UserR[] = [];
  newCita: Cita = {
    id: null,
    nombre: null,
    foto: null,
    dia: null,
    mes: null,
    empresa: null, 
    telefono: null,
  }

  constructor(private authSvc: AuthService,private firestore: FirestoreService,
   private interaction: InteractionService) {
    this.authSvc.stateUser().subscribe(res =>{
      if(res){
        this.getDatosUser(res.uid);
      }else{
        console.log('no Logeado');
      }
    })
  
  }

  ngOnInit() { this.getCitas(); }

  getDatosUser(uid: string){
    const path = 'Usuarios/';
    const id = uid;
    this.firestore.getDoc<UserR>(path, id).subscribe( res =>{
      if(res){
        this.perfil = res.perfil;
        this.nombre = res.nombre;
        this.foto = res.foto;
        this.empresa = res.empresa;
        this.telefono = res.tel;
      }
    })
  }

  cambioValor(value){
    console.log(value);
  }
  async guardarCita(){
    if(this.newCita.dia == null || this.newCita.mes == null){
      this.interaction.alertCuenta();
    }else{
      const path = 'Citas';
      this.newCita.nombre = this.nombre;
      this.newCita.id = this.firestore.getId(),
      this.newCita.foto = this.foto;
      this.newCita.empresa = this.empresa;
      this.newCita.telefono = this.telefono;
      await this.firestore.createDoc(this.newCita, path, this.newCita.id);
      this.interaction.presentToast('Cita Regristrada!');
    }
  }
  getCitas() {
    this.firestore.getCollection<Cita>(this.path).subscribe(  res => {
           this.Citas = res;
    });
  }
  async presentToast(msg: string) {
    const toast = await this.interaction.toastController.create({
      message: msg,
      cssClass: 'normal',
      duration: 2000,
      color: 'light',
    });
    toast.present();
  }
  async deleteProducto(cita: Cita) {
    this.interaction.alertAdmin('cita', this.path, cita.id);
  }
}
