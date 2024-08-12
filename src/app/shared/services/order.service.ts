import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {OrderForm} from "../../../types/order-form";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  createOrder(data: OrderForm) {
    return this.http.post<{success: boolean, message?: string}>(environment.api +`order-tea`, data);
  }
}
