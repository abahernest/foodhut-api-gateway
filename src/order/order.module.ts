import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ORDER_SERVICE_NAME, ORDER_PACKAGE_NAME } from './proto/order.pb';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { DISPATCH_PACKAGE_NAME, DISPATCH_SERVICE_NAME } from './proto/dispatch.pb';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ORDER_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50052',
          package: ORDER_PACKAGE_NAME,
          protoPath: 'node_modules/foodhut-grpc-proto/proto/order.proto',
        },
      },
      {
        name: DISPATCH_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50053',
          package: DISPATCH_PACKAGE_NAME,
          protoPath: 'node_modules/foodhut-grpc-proto/proto/dispatch.proto',
        },
      },
    ]),
    TypeOrmModule.forFeature([Order]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
