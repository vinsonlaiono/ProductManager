import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  getProducts(){
    return this._http.get('/allproducts')
  }
  createProduct(product){
    return this._http.post('/products', product)
  }
  deleteProduct(id){
    return this._http.delete(`/delete/${id}`)
  }
  getProduct(id){
    console.log(id)
    return this._http.get('/product/'+id)
  }
  updateProduct(product){
    return this._http.put(`/products/${product.id}/edit`, product)
  }
}
