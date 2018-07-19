import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router, Params } from '@angular/router';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  newProduct: any
  errors:any
  constructor(private _httService: HttpService,  private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this.newProduct= {
      title: "",
      price: "",
      image_url: ""
    }
    this.errors ={
      title: "",
      price: "",
    }
  }

  createNewProduct(){
    this._httService.createProduct(this.newProduct)
      .subscribe(data => {
        if(data['message'] == "Success"){
            console.log(data)
            this.newProduct= {
              title: "",
              price: null,
              image_url: ""
            }
            this._router.navigate(['products']);
        } else {
          this.errors = data['error']['errors']
          console.log(data['error']['errors'])
        }
      })
  }
}
