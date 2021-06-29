import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Producto} from "../../models/producto";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {
  productoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router:Router,
    private toastr: ToastrService) {
    this.productoForm = this.fb.group(
      {
        producto:['', Validators.required],
        categoria:['', Validators.required],
        ubicacion:['', Validators.required],
        precio:['', Validators.required],
      }
    )
  }

  ngOnInit(): void {
  }

  addProduct() {
    // console.log(this.productoForm);

    const PRODUCTO: Producto = {
      nombre: this.productoForm.get('producto')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      ubicacion: this.productoForm.get('ubicacion')?.value,
      precio: this.productoForm.get('precio')?.value,
    }
    console.log(PRODUCTO);
    this.router.navigate(['/']);

    this.showSuccess()
  }

  showSuccess(){
    this.toastr.success('Producto añadido correctamente','Correcto')
  }
}