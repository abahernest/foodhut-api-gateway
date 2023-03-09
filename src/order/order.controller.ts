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
import { Observable, firstValueFrom } from 'rxjs';
import { Request } from 'express';
import {
  CreateOrderResponse,
  OrderServiceClient,
  ORDER_SERVICE_NAME,
  CreateOrderRequest,
} from './proto/order.pb';
import { newOrderValidation } from './validation.pipe';

@Controller('api/v1/order')
export class OrderController implements OnModuleInit {
  private orderSvc: OrderServiceClient;

  @Inject(ORDER_SERVICE_NAME)
  private readonly orderClient: ClientGrpc;

  public onModuleInit(): void {
    this.orderSvc =
      this.orderClient.getService<OrderServiceClient>(ORDER_SERVICE_NAME);
  }

  @Post()
  @UsePipes(newOrderValidation)
  private async createOrder( @Req() req: Request, @Body() body: CreateOrderRequest ): Promise<Observable<CreateOrderResponse>> {

    // handover to microservice
    const orderServiceResponse = this.orderSvc.createOrder(body);

    return orderServiceResponse;
  }
}
