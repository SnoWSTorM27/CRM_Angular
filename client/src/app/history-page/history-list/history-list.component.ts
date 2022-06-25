import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { MaterialInstance, MaterialService } from 'src/app/shared/classes/material.service';
import { OrdersService } from 'src/app/shared/services/oders.service';
import { Order, OrderPosition } from '../../shared/interfaces';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.css']
})
export class HistoryListComponent implements  OnInit, OnDestroy, AfterViewInit {

  constructor(private ordersService: OrdersService) {}

  @Input() orders: Order[]
  @ViewChild('modal') modalRef: ElementRef

  orders$: Observable<OrderPosition[]>
  selectedOrder$: Subject<Order> = new Subject<Order>()


  selectedOrder: Order
  modal: MaterialInstance

  ngOnInit(): void {
      
      // console.log(this.orders$);
      
  }

  ngOnDestroy() {
    this.modal.destroy()
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  selectOrder(order: Order) {
    this.modal.open()
    this.ordersService.getByOrder(order.order_number).subscribe(
      (result) => {
        this.selectedOrder$.next({
          ...order, list: result
        })
      }
    )
    this.selectedOrder = order
  }

  closeModal() {
    this.selectedOrder$.next(null)
    this.modal.close()
  }

}
