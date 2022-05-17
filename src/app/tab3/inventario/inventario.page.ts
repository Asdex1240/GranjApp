import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service'; 
import { FirestorageService } from 'src/app/services/firestorage.service'; 
import { Producto } from 'src/app/models/producto.model';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.page.html',
  styleUrls: ['./inventario.page.scss'],
})
export class InventarioPage implements OnInit {
  public selectedValue: 'fruta' | 'verdura';
  productos: Producto[] = [];
  newProducto: Producto;
  enableNewProducto = false;
  private path = 'Productos/';
  newImage = '';
  newFile: any;
  public categoria: string[]=['fruta','verdura'];
  constructor(public firestoreSvc: FirestoreService,
              public firestorageSvc: FirestorageService,
              public interaction: InteractionService) { }

  ngOnInit() { this.getProductos(); }
  nuevo() {
    this.enableNewProducto = true;
    this.newProducto = {
      nombre: '',
      foto: 'htt',
      id: this.firestoreSvc.getId(),
      descrip: '',
      categoria: 'fruta'
    };
  }
  getProductos() {
    this.firestoreSvc.getCollection<Producto>(this.path).subscribe(  res => {
           this.productos = res;
    });
  }

  async guardarProducto() {
    const path = 'Productos';
    const name = this.newProducto.nombre;
    const res = await this.firestorageSvc.uploadImage(this.newFile, path, name);
    this.newProducto.foto = res;
    this.firestoreSvc.createDoc(this.newProducto, this.path, this.newProducto.id).then( res => {
      this.interaction.presentToast('guardo con exito');
    }).catch( error => {
      this.interaction.presentToast('no se pude guardar');
      });
  }
  async deleteProducto(producto: Producto) {
    this.interaction.alertAdmin('inv', this.path, producto.id);
  }

  async newImageUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
        this.newFile = event.target.files[0];
        const reader = new FileReader();
        reader.onload = ((image) => {
            this.newProducto.foto = image.target.result as string;
        });
        reader.readAsDataURL(event.target.files[0]);
      }
  }
}
