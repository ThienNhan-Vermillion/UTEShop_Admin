import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { UTEShopOrder, UTEShopUser, UTEShopOrderItem, UTEShopDrink } from '../models/uteshop.models';

@Module({
  imports: [
    SequelizeModule.forFeature([UTEShopOrder, UTEShopUser, UTEShopOrderItem, UTEShopDrink]),
  ],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
