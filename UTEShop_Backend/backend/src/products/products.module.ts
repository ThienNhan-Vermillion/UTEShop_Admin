import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UTEShopDrink } from '../models/uteshop.models';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [SequelizeModule.forFeature([UTEShopDrink])],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
