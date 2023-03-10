import { Order, OrderStatus } from '../entity/order.entity';


export class FetchAllOrdersResponseDto extends Order {
  id: string;

  name: string;

  status: OrderStatus;

  address: string;

  dispatched: boolean;

  createdAt: Date;

  updatedAt: Date;

}