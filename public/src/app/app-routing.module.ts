import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { EditComponent } from './edit/edit.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
  {path: "products", component: AllProductsComponent},
  {path: "products/new", component: CreateComponent},
  {path: "edit/:id", component: EditComponent},
  {path: "", component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
