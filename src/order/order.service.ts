import { Injectable } from '@nestjs/common';
import { Order } from './entity/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FetchAllOrdersResponseDto, OrderDto } from './dto/order.dto';



@Injectable()
export class OrderService {
  @InjectRepository(Order)
  private readonly repository: Repository<Order>;

  public async fetchAllOrders( limit: number, page: number): Promise<Array<FetchAllOrdersResponseDto>> {

    const orders: Array<FetchAllOrdersResponseDto> = await this.repository.find({
      withDeleted: false,
      select: {
        id: true,
        name: true,
        address: true,
        status: true,
        dispatched: true,
        createdAt: true,
        updatedAt: true,
      },
      order: {
        createdAt: 'DESC',
      },
      skip: limit*(--page),
      take: limit
    });

    return orders;
  }

  public async findOrderById(id: string): Promise<OrderDto> {

    return await this.repository.findOne({
      withDeleted: false,
      where: { id },
      select: {
        id: true,
        name: true,
        address: true,
        status: true,
        dispatched: true,
        createdAt: true,
        updatedAt: true,
      },
    });

  }

  public async deleteOrder( id: string) {

    await this.repository.softDelete( id );

  }
}
