import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto.model';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-verduras',
  templateUrl: './verduras.page.html',
  styleUrls: ['./verduras.page.scss'],
})
export class VerdurasPage implements OnInit {
  private path = 'Productos/';
  productos: Producto[] = [];

  constructor(public firestoreService: FirestoreService,
  ) { }
  
  ngOnInit() {
    this.getProductos();
  }
  getProductos() {
    this.firestoreService.getCollection<Producto>(this.path).subscribe(  res => {
           this.productos = res;
    });
  }
}
