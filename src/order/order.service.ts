import { Injectable } from '@nestjs/common';
import { Order } from './entity/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FetchAllOrdersResponseDto } from './dto/order.dto';



@Injectable()
export class OrderService {
  @InjectRepository(Order)
  private readonly repository: Repository<Order>;

  public async fetchAllOrders( limit: number, page: number): Promise<Array<FetchAllOrdersResponseDto>> {

    const orders: Array<FetchAllOrdersResponseDto> = await this.repository.find({
      where: {
        deletedAt: null,
      },
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
}
