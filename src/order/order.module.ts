import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ORDER_SERVICE_NAME, ORDER_PACKAGE_NAME } from './order.pb';
import { DISPATCH_SERVICE_NAME, DISPATCH_PACKAGE_NAME } from './dispatch.pb';
import { OrderController } from './order.controller';

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
  ],
  controllers: [OrderController],
})
export class OrderModule {}
