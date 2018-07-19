import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  products: any;

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.getAllProducts()
  }

  getAllProducts() {
    this._httpService.getProducts()
      .subscribe(data => {
        // console.log(data)
        this.products = data['product']
      })
  }

  deleteOneProduct(id){
    this._httpService.deleteProduct(id)
    .subscribe(data => {
      console.log(data)
      this.getAllProducts()
    })
  }
}
