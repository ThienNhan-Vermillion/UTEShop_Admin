import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from './models/user.model';
import { UTEShopUser, UTEShopOrder, UTEShopOrderItem, UTEShopDrink } from './models/uteshop.models';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    // 👇 Dòng này cực kỳ quan trọng: load .env vào process.env
    ConfigModule.forRoot({
      isGlobal: true, // cho phép dùng ở mọi module mà không cần import lại
    }),

    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.MYSQL_HOST || 'localhost',
      port: parseInt(process.env.MYSQL_PORT || '3306'),
      username: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || '123456',
      database: process.env.MYSQL_DB || 'uteshop',
      models: [Users, UTEShopUser, UTEShopOrder, UTEShopOrderItem, UTEShopDrink],
      autoLoadModels: true,
      synchronize: false,
      logging: true,
    }),

    UsersModule,
    AuthModule,
    DashboardModule,
    OrdersModule,
    ProductsModule,
  ],
})
export class AppModule {}
