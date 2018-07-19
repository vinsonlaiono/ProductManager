import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router, Params } from '@angular/router';



@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  product: any;
  errors: any;
 

  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this.getOneAuthor()
    this.errors= {
      title: "",
      price: ""
    }
  }
  updateProduct() {
    console.log("In updateauhor method=====ID: ", this.product.id)
    console.log("In updateauhor method=====ID: ", this.product.title)
    this._httpService.updateProduct(this.product)
      .subscribe(data => {
        console.log("The ", data)
        if(data['message'] == "Error"){
          console.log("the greateset error", data['err']['errors'])
          this.errors = data['err']['errors']
        } else {
          // console.log("Updated author: ", data)
          this._router.navigate(['products']);
        }
      })
  }

  getOneAuthor() {
    this._route.params.subscribe((params: Params) => {
      console.log("author id: ==============")
      let obs = this._httpService.getProduct(params['id'])
      obs.subscribe(data => {
        console.log("populate edit fields")
        console.log("got one product: ", data)
        this.product = {
          id: params['id'],
          title: data['product'].title,
          price: data['product'].price,
          image_url: data['product'].image_url
        }
      })
    })
  }
  deleteOneProduct(id) {
    this._route.params.subscribe((params: Params) => {
      this._httpService.deleteProduct(params['id'])
        .subscribe(data => {
          console.log(data)
          this._router.navigate(['products']);
        })
    })
  }
}
