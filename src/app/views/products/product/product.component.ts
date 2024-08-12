import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProductsService} from "../../../shared/services/products.service";
import {ProductType} from "../../../../types/products";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'product-component',
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit {

  public product: ProductType;

  @ViewChild('description')
  private desc!: ElementRef;

  constructor(private productService: ProductsService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.product = {
      description: '',
      id: 0,
      image: '',
      price: 0,
      title: ''
    }
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.productService.getProduct(+params['id'])
          .subscribe({
            next: (data) => {
              this.product = data;
              this.changeText();
            },
            error: (error) => {
              console.log(error);
              this.router.navigate(['/']);
            }
          });
      }
    });
  }

  changeText() {
    const part1: string[] = this.product.description.split('P.S.');
    let part2: string[] | string;

    if (this.product.description.includes('P.S.' + part1[1])) {
      part2 = this.product.description.split('P.S.' + part1[1], this.product.description.split('P.S.' + part1[1]).length - 1)[0];
      part2 = part2.split('.');
      part2.pop();
    } else {
      part2 = this.product.description.split('.');
      part2.pop();
    }

    if (part2) {
      for (let i = 0; i < part2.length; i++) {
        let span = document.createElement('span');
        span.innerText = part2[i] + '.';
        span.classList.add('fst-italic');
        span.classList.add('lh-sm');
        span.classList.add('text-danger-emphasis');
        span.style.textIndent = '20px';
        this.desc.nativeElement.appendChild(span);
      }
    }
    if (part1.length > 1) {
      let span = document.createElement('span');
      span.innerText = 'P.S. ' + part1[1];
      span.classList.add('fst-italic');
      span.classList.add('text-dark');
      this.desc.nativeElement.appendChild(span);
    }

  }
}
