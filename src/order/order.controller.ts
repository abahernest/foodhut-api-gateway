import {
  Controller,
  Inject,
  Post,
  OnModuleInit,
  Req,
  UsePipes,
  Body, Patch, Res, HttpException,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable, firstValueFrom } from 'rxjs';
import { Request } from 'express';
import {
  CreateOrderResponse,
  OrderServiceClient,
  ORDER_SERVICE_NAME,
  CreateOrderRequest,
  UpdateOrderRequest,
  UpdateOrderResponse,
} from './proto/order.pb';
import { newOrderValidation, updateOrderValidation } from './validation.pipe';


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

    // handover to order processing microservice
    return this.orderSvc.createOrder(body);
  }

  @Patch()
  @UsePipes(updateOrderValidation)
  private async updateOrder( @Req() req: Request, @Body() body: UpdateOrderRequest ): Promise<Observable<UpdateOrderResponse>> {

    // handover to order processing microservice
    const responseStream = this.orderSvc.updateOrder(body);

    const responseObj = await firstValueFrom(responseStream);

    if (responseObj.code != 200){
      throw new HttpException(responseObj, responseObj.code);
    }

    return responseStream;
  }

}
