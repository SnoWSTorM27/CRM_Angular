import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Order, OrderPosition } from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  create(order: Order): Observable<Order> {
    return this.http.post<Order>('/api/order', order)
  }

  getByOrder(order_number: number): Observable<OrderPosition[]> {
    return this.http.get<OrderPosition[]>(`/api/order/${order_number}`)
  }

  fetch(params: any = {}): Observable<Order[]> {
    return this.http.get<Order[]>('/api/order', {
      params: new HttpParams({
        fromObject: params
      })
    })
  }
}