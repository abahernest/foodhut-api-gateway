import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { DispatchModule } from './dispatch/dispatch.module';

@Module({
  imports: [OrderModule, DispatchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
