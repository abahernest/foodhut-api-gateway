import { createMockServer } from 'grpc-mock';
import { ORDER_PACKAGE_NAME, ORDER_SERVICE_NAME } from './proto/order.pb';
import { DISPATCH_PACKAGE_NAME, DISPATCH_SERVICE_NAME } from './proto/dispatch.pb';
export const ordersMockServer = createMockServer({
  protoPath: 'node_modules/foodhut-grpc-proto/proto/order.proto',
  packageName: ORDER_PACKAGE_NAME,
  serviceName: ORDER_SERVICE_NAME,
  rules: [
    {
      method: 'createOrder',
      input: { name: 'john doe', address: '12 john ave' },
      output: {
        id: '57cb4a27-8a0e-4394-a17c-41a20f6c07fd',
        name: 'john doe',
        address: '12 john ave',
        status: 'pending',
        dispatched: false,
        createdAt: '2023-03-10T00:59:35.939Z',
        updatedAt: '2023-03-10T00:59:35.939Z',
      },
    },

    { method: 'updateOrder',
      input: { id: '57cb4a27-8a0e-4394-a17c-41a20f6c07fd', address: '12 john ave' },
      output: { code: 200, message: 'success', data: {
          id: '57cb4a27-8a0e-4394-a17c-41a20f6c07fd',
          name: 'john doe',
          address: '12 john ave',
          status: 'pending',
          dispatched: false,
          createdAt: '2023-03-10T00:59:35.939Z',
          updatedAt: '2023-03-10T00:59:35.939Z'} }
    },

    {
      method: 'updateOrder',
      input: { id: '57cb4a27-8a0e-4394-a17c-41a20f6c07fd', address: '12 john ave' },
      output: { code: 400, message: 'resource not found' },
    }
  ],
});



export const dispatchMockServer = createMockServer({
  protoPath: 'node_modules/foodhut-grpc-proto/proto/dispatch.proto',
  packageName: DISPATCH_PACKAGE_NAME,
  serviceName: DISPATCH_SERVICE_NAME,
  rules: [
    {
      method: 'monitorDispatch',
      input: { orderId: '57cb4a27-8a0e-4394-a17c-41a20f6c07fd' },
      output: { code: 200, message: 'success'},
    },
    {
      method: 'monitorDispatch',
      input: { orderId: '57cb4a27-8a0e-4394-a17c-41a20f6c07fd' },
      output: { code: 400, message: 'resource not found'},
    },
  ],
});

