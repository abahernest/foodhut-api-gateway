import { Test } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { ordersMockServer, dispatchMockServer } from './grpc.mockserver';
import { ORDER_PACKAGE_NAME, ORDER_SERVICE_NAME } from './proto/order.pb';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DISPATCH_PACKAGE_NAME, DISPATCH_SERVICE_NAME } from './proto/dispatch.pb';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';

const moduleMocker = new ModuleMocker(global);
// ordersMockServer.listen('0.0.0.0:50052');
// dispatchMockServer.listen('0.0.0.0:50053');

describe('OrderController', () => {
  let orderController;
  let orderService;
  const findAllResults = [{
    id:"57cb4a27-8a0e-4394-a17c-41a20f6c07fd",
    name:"john doe",
    address:"12 left ave",
    status: "pending",
    dispatched: false,
    createdAt: '2023-03-10 20:16:12.563173',
    updatedAt: '2023-03-10 20:16:12.563173'
  }];
  const mockUserService = {};

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      // imports: [
      //   ClientsModule.register([
      //     {
      //       name: ORDER_SERVICE_NAME,
      //       transport: Transport.GRPC,
      //       options: {
      //         url: '0.0.0.0:50052',
      //         package: ORDER_PACKAGE_NAME,
      //         protoPath: 'node_modules/foodhut-grpc-proto/proto/order.proto',
      //       },
      //     },
      //     {
      //       name: DISPATCH_SERVICE_NAME,
      //       transport: Transport.GRPC,
      //       options: {
      //         url: '0.0.0.0:50053',
      //         package: DISPATCH_PACKAGE_NAME,
      //         protoPath: 'node_modules/foodhut-grpc-proto/proto/dispatch.proto',
      //       },
      //     },
      //   ]),
      //   TypeOrmModule.forFeature([Order]),
      // ],
      controllers: [OrderController],
      providers: [OrderService],
    })
      .overrideProvider(OrderService).useValue(mockUserService)
      // .useMocker((token) => {
      //   if (token === OrderService) {
      //     return {
      //       fetchAllOrders: jest.fn().mockResolvedValue(findAllResults),
      //       findOrderById: jest.fn().mockResolvedValue(findAllResults[0]),
      //       deleteOrder: jest.fn().mockResolvedValue(null),
      //     };
      //   }
      //   if (typeof token === 'function') {
      //     const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>;
      //     const Mock = moduleMocker.generateFromMetadata(mockMetadata);
      //     return new Mock();
      //   }
      // })
      .compile();

    orderService = moduleRef.resolve(OrderService);
    orderController = moduleRef.resolve(OrderController);
  });

  // describe('findAll', () => {
  //   it('should return an array of order objects', async () => {
  //
  //     expect(await orderController.fetchAllOrders(10,1)).toBe(findAllResults);
  //   });
  // });

  it('should be defined', ()=>{
    expect(orderController).toBeDefined();
  })
});