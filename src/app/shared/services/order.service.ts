import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {OrderForm} from "../../../types/order-form";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  createOrder(data: OrderForm) {
    return this.http.post<{success: boolean, message?: string}>(`https://testologia.ru/order-tea`, data);
  }
}
