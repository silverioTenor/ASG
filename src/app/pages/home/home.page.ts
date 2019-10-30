import { ProductService } from './../../services/product.service';
import { Component } from '@angular/core';
import { Product } from './../../model/product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private products = new Array<Product>();
  private productsSubscription: Subscription;

  constructor(private productService: ProductService) {
    this.productsSubscription = this.productService.getProducts().subscribe(data => { this.products = data; });
  }

  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
  }

}
