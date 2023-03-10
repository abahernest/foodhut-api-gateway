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

export class OrderDto {
  id: string;

  name: string;

  status: OrderStatus;

  address: string;

  dispatched: boolean;

  createdAt: Date;

  updatedAt: Date;
}

export class CustomOrderResponseDto{

  code: number;

  message: string;
  data?: OrderDto;
}