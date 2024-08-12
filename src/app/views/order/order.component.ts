import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {phoneValidator} from "../../shared/directives/phone-validator.directive";
import {OrderService} from "../../shared/services/order.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  notSuccess = false;
  productName: string = '';
  subscriptionOrder: Subscription | null = null;

  @ViewChild('success')
  private success!: ElementRef;

  signInForm = this.fb.group({
    product: [''],
    name: ['', [Validators.pattern('^([a-zA-Z]*|[а-яА-Я]*)$'), Validators.required]],
    lastName: ['', [Validators.pattern('^([a-zA-Z]*|[а-яА-Я]*)$'), Validators.required]],
    phone: ['', [phoneValidator('^((\\+7|8|7)(\\d{10}))$|^((\\+7|7|8)((-|\\s|\\S)(\\d{3})){2}((-|\\s|\\S)(\\d{2})){2})*$'), Validators.required]],
    country: ['', [Validators.pattern('^([a-zA-Z]*|[а-яА-Я]*)$'), Validators.required]],
    index: ['', [Validators.pattern('^\\d{6}$'), Validators.required]],
    address: ['', [Validators.pattern('^[а-яА-Я0-9a-zA-Z\\d ,.\\-\\/\\\\]*$'), Validators.required]],
    comment: ['']
  });

  get name() {
    return this.signInForm.get('name');
  }

  get lastName() {
    return this.signInForm.get('lastName');
  }

  get phone() {
    return this.signInForm.get('phone');
  }

  get country() {
    return this.signInForm.get('country');
  }

  get index() {
    return this.signInForm.get('index');
  }

  get address() {
    return this.signInForm.get('address');
  }

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private orderService: OrderService) {
  }

  ngOnInit(): void {
    // get param
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['product']) {
        this.productName = params['product'];
      }
    });

    // product input changes
    this.signInForm.patchValue({
      product: this.productName
    });
  }

  signIn() {
    if (this.signInForm.status === "VALID") {
      this.subscriptionOrder = this.orderService.createOrder({
        name: this.name?.value as string,
        last_name: this.lastName?.value as string,
        phone: this.phone?.value as string,
        country: this.country?.value as string,
        zip: this.index?.value as string,
        product: this.signInForm.get('product')?.value as string,
        address: this.address?.value as string,
        comment: this.signInForm.get('comment')?.value as string
      }).subscribe((response) => {
        if (response.success && !response.message) {
          this.success.nativeElement.style.transform= 'scale(1)';
          this.notSuccess = false;
          const timeout = setTimeout(()=> {
            this.success.nativeElement.style.transform= 'scale(0)';
            this.signInForm.reset();
          }, 4000);
        } else {
          this.notSuccess = true;
        }
      });
    }
  }
}
