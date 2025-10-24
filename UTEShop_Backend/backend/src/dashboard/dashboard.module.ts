import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from '../models/user.model';
import { UTEShopOrder, UTEShopUser } from '../models/uteshop.models';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
  imports: [SequelizeModule.forFeature([Users, UTEShopOrder, UTEShopUser])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
