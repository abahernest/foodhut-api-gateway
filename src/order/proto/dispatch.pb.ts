/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "dispatch";

export interface MonitorDispatchRequest {
  orderId: string;
}

export interface MonitorDispatchResponse {
  status: string;
  error: string[];
}

export const DISPATCH_PACKAGE_NAME = "dispatch";

export interface DispatchServiceClient {
  monitorDispatch(request: MonitorDispatchRequest): Observable<MonitorDispatchResponse>;
}

export interface DispatchServiceController {
  monitorDispatch(
    request: MonitorDispatchRequest,
  ): Promise<MonitorDispatchResponse> | Observable<MonitorDispatchResponse> | MonitorDispatchResponse;
}

export function DispatchServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["monitorDispatch"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("DispatchService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("DispatchService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const DISPATCH_SERVICE_NAME = "DispatchService";
