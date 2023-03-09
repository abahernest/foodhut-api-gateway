import {
  Controller,
  Inject,
  Post,
  OnModuleInit,
  Req,
  UsePipes,
  Body,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Request } from 'express';
import {
  CreateOrderResponse,
  OrderServiceClient,
  ORDER_SERVICE_NAME,
  CreateOrderRequest,
} from './order.pb';
import { newOrderValidation } from './validation.pipe';
import {
  DISPATCH_SERVICE_NAME,
  DispatchServiceClient,
  MonitorDispatchRequest,
} from './dispatch.pb';

@Controller('api/v1/order')
export class OrderController implements OnModuleInit {
  private orderSvc: OrderServiceClient;
  private dispatchSvc: DispatchServiceClient;

  @Inject(ORDER_SERVICE_NAME)
  private readonly orderClient: ClientGrpc;

  @Inject(DISPATCH_SERVICE_NAME)
  private readonly dispatchClient: ClientGrpc;

  public onModuleInit(): void {
    this.orderSvc =
      this.orderClient.getService<OrderServiceClient>(ORDER_SERVICE_NAME);
    this.dispatchSvc = this.dispatchClient.getService<DispatchServiceClient>(
      DISPATCH_SERVICE_NAME,
    );
  }

  @Post()
  @UsePipes(newOrderValidation)
  private async createOrder(
    @Req() req: Request,
    @Body() body: CreateOrderRequest,
  ): Promise<Observable<CreateOrderResponse>> {
    // handover to microservice
    const order = this.orderSvc.createOrder(body);

    // Get response in streams
    await order.forEach(async (value) => {
      const dispatchReequest: MonitorDispatchRequest = { orderId: value.id };
      // monitor dispatch activity
      await this.dispatchSvc.monitorDispatch(dispatchReequest);
    });

    return order;
  }
}
