import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../services/auth.service';
import { UserR } from '../models/user.model';
import { FirestoreService } from '../services/firestore.service'; 
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  perfil: 'admin' | 'cliente' = null;
  nombre: string;
  empresa: string;
  foto: string;
  constructor(private router: Router,
              private authSvc: AuthService, 
              private afAuth: AngularFireAuth,
              private firestore: FirestoreService) 
              { 
                this.authSvc.stateUser().subscribe(res =>{
                  if(res){
                    console.log('Logeado');
                    this.getDatosUser(res.uid);
                  }else{
                    console.log('no Logeado');
                  }
                })
              }
  onLogout(){
    console.log('LogOut');
    this.afAuth.auth.signOut();
    this.router.navigateByUrl('/tabs/entrar');
  }
  getDatosUser(uid: string){
    const path = 'Usuarios';
    const id = uid;
    this.firestore.getDoc<UserR>(path, id).subscribe( res =>{
      if(res){
        this.perfil = res.perfil;
        this.nombre = res.nombre;
        this.empresa = res.empresa;
        this.foto = res.foto;
      }
    })
  }
  goTo(ir: string){
    if(ir=='cita'){
      this.router.navigate(['tabs/tab3/citas']);
    }else if(ir=='inv'){
      this.router.navigate(['tabs/tab3/inventario']);
    }else if(ir == 'maps'){
      this.router.navigate(['tabs/maps']);
    }
  }  

}
