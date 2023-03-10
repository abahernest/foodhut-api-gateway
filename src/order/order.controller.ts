import {
  Controller,
  Inject,
  Post,
  OnModuleInit,
  Req,
  UsePipes,
  Body, Patch, Res, HttpException, Get, ParseEnumPipe, DefaultValuePipe, ParseIntPipe, Query,
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
import { OrderService } from './order.service';
import { FetchAllOrdersResponseDto } from './dto/order.dto';


@Controller('api/v1/order')
export class OrderController implements OnModuleInit {
  private orderSvc: OrderServiceClient;


  @Inject(ORDER_SERVICE_NAME)
  private readonly orderClient: ClientGrpc;

  @Inject(OrderService)
  private readonly  service: OrderService;


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

  @Get()
  private async fetchAllOrders(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ): Promise<Array<FetchAllOrdersResponseDto>> {

    return this.service.fetchAllOrders(limit, page);
  }

}
