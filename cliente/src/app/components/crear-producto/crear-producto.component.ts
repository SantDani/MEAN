import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Producto} from "../../models/producto";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {ProductoService} from "../../services/producto.service";

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {
  productoForm: FormGroup;
  titulo:string;
  idProduct:string | null;

  constructor(
    private fb: FormBuilder,
    private router:Router,
    private toastr: ToastrService,
    private productoService: ProductoService,
    private aRouter: ActivatedRoute) {
    this.productoForm = this.fb.group(
      {
        producto:['', Validators.required],
        categoria:['', Validators.required],
        ubicacion:['', Validators.required],
        precio:['', Validators.required],
      }
    );
    this.titulo = 'Crear Producto';
    this.idProduct = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.isEdit();
  }

  addProduct() {
    // console.log(this.productoForm);

    const PRODUCTO: Producto = {
      nombre: this.productoForm.get('producto')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      ubicacion: this.productoForm.get('ubicacion')?.value,
      precio: this.productoForm.get('precio')?.value,
    }
    console.log('producto enviado' , PRODUCTO);

    if(this.idProduct !== null){
      // editar producto
      this.updateProduct(PRODUCTO);
    }else{
      // crear nuevo producto
      this.newProduct(PRODUCTO);
    }



  }

  private newProduct(PRODUCTO: Producto) {
    this.productoService.addProduct(PRODUCTO).subscribe(data => {
      this.showSuccess()
      this.router.navigate(['/']);
      console.log('respuesta', data);

    }, error => {
      console.log(error);
      this.productoForm.reset();
    });
  }

  showSuccess(){
    this.toastr.success('Producto añadido correctamente','Correcto')
  }

  isEdit(){
    if(this.idProduct !== null){
      this.titulo = 'Editar Producto';
      this.productoService.getProduct(this.idProduct).subscribe( data =>{
        this.productoForm.setValue({
          producto: data.nombre,
          categoria: data.categoria,
          ubicacion: data.ubicacion,
          precio: data.precio,
        })
      });
    }
  }


  private updateProduct(product: Producto) {
    this.productoService.updateProduct(this.idProduct, product).subscribe(data =>{
      this.toastr.info('El producto fue actualizado con exito', 'Producto Actualizado!');
      this.router.navigate(['/']);
    }, error => {
      console.log(error);
      // this.productoForm.reset();
    })
  }
}
