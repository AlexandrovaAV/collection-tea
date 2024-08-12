import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductsService} from "../../../shared/services/products.service";
import {Router} from "@angular/router";
import {ProductType} from "../../../../types/products";
import {Subscription} from "rxjs";

@Component({
  selector: 'catalog-component',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit, OnDestroy {

  products: ProductType[] = [];
  subscriptionProducts: Subscription | null = null;

  constructor(private productsService: ProductsService, private router: Router) {
  }

  ngOnInit(): void {
    this.subscriptionProducts = this.productsService.getProducts()
      .subscribe({
        next: (data) => {
          this.products = data;
        },
        error: (error) => {
          console.log(error);
          this.router.navigate(['/']);
        }
      })
  }

  ngOnDestroy() {
    this.subscriptionProducts?.unsubscribe();
  }

}
