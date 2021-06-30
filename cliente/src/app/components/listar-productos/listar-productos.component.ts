import { Component, OnInit } from '@angular/core';
import {ProductoService} from "../../services/producto.service";
import {Producto} from "../../models/producto";
import {ToastrService} from "ngx-toastr";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit {
  listProductos: Producto[];

  constructor(
    private productoService: ProductoService,
    private toastr: ToastrService,
    private router: Router) {
    this.listProductos = [];
  }

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos(){
    this.productoService.getProductos().subscribe(data => {
      console.log(data);
      this.listProductos = data;
    }, error => console.log(error))
  }

  deleteProduct(product: any) {
    console.log( 'eliminar',product._id);
    this.productoService.deleteProducto(product._id).subscribe( data =>{
      this.toastr.error('El producto fue eliminado con exito', 'Producto Eliminado');
      this.getProductos();
      }
    )
  }


  updateProduct(producto: any) {
    this.router.navigate(['/editar-producto', producto._id]);
  }
}
