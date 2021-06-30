import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Producto} from "../models/producto";

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  URL_API = 'http://localhost:4000/api/productos/';
  constructor(private http:HttpClient) {

  }

  getProductos(): Observable<any>{
    return this.http.get(this.URL_API);
  }

  deleteProducto(id:string): Observable<any>{
    return this.http.delete(this.URL_API + id);
  }

  addProduct(producto: Producto): Observable<any>{
    return this.http.post(this.URL_API, producto);
  }

  getProduct(id:string): Observable<any>{
    return this.http.get(this.URL_API + id);
  }

  updateProduct(id: string | null, product: Producto): Observable<any>{

    return this.http.put(this.URL_API + id, product);

  }
}
