/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "order";

export interface CreateOrderRequest {
  name: string;
  address: string;
}

export interface CreateOrderResponse {
  id: string;
  name: string;
  address: string;
  status: string;
  dispatched: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateOrderRequest {
  id: string;
  address?: string | undefined;
  status?: string | undefined;
}

export interface UpdateOrderResponse {
  code: number;
  message: string;
  data?: CreateOrderResponse | undefined;
}

export const ORDER_PACKAGE_NAME = "order";

export interface OrderServiceClient {
  createOrder(request: CreateOrderRequest): Observable<CreateOrderResponse>;

  updateOrder(request: UpdateOrderRequest): Observable<UpdateOrderResponse>;
}

export interface OrderServiceController {
  createOrder(
    request: CreateOrderRequest,
  ): Promise<CreateOrderResponse> | Observable<CreateOrderResponse> | CreateOrderResponse;

  updateOrder(
    request: UpdateOrderRequest,
  ): Promise<UpdateOrderResponse> | Observable<UpdateOrderResponse> | UpdateOrderResponse;
}

export function OrderServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createOrder", "updateOrder"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("OrderService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("OrderService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const ORDER_SERVICE_NAME = "OrderService";
