import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductType} from "../../../types/products";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient) { }

  getProducts(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(environment.api +'tea');
  }
  getProduct(id: number): Observable<ProductType> {
    return this.http.get<ProductType>(environment.api + `tea?id=${id}`);
  }
}
