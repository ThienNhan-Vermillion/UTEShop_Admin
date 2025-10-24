import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UTEShopOrder, UTEShopUser, UTEShopOrderItem, UTEShopDrink } from '../models/uteshop.models';
import { Op, QueryTypes } from 'sequelize';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(UTEShopOrder) private orderModel: typeof UTEShopOrder,
    @InjectModel(UTEShopUser) private userModel: typeof UTEShopUser,
    @InjectModel(UTEShopOrderItem) private orderItemModel: typeof UTEShopOrderItem,
    @InjectModel(UTEShopDrink) private drinkModel: typeof UTEShopDrink,
  ) {}

  async getAllOrders(page: number = 1, limit: number = 10, status?: string, search?: string) {
    try {
      console.log('🔍 OrdersService.getAllOrders called with:', { page, limit, status, search });
      
      // Test database connection first
      console.log('🔍 Testing database connection...');
      const totalCount = await this.orderModel.count();
      console.log('🔍 Total orders in database:', totalCount);
      
      // Test raw query to check if we can access the database
      try {
        const rawResult = await this.orderModel.sequelize?.query('SELECT COUNT(*) as count FROM orders', { 
          type: QueryTypes.SELECT 
        });
        console.log('🔍 Raw SQL result:', rawResult);
      } catch (rawError) {
        console.error('❌ Raw SQL error:', rawError);
      }
      
      if (totalCount === 0) {
        console.log('⚠️ No orders found in database');
        return {
          orders: [],
          total: 0,
          page: parseInt(page.toString()),
          limit: parseInt(limit.toString()),
          totalPages: 0
        };
      }
      
      const offset = (page - 1) * limit;
      let whereClause: any = {};

      if (status && status !== 'all') {
        whereClause.status = status;
      }

      if (search) {
        whereClause[Op.or] = [
          { order_number: { [Op.like]: `%${search}%` } },
        ];
      }

      console.log('🔍 Where clause:', whereClause);

      // Query đơn hàng với associations
      const { count, rows: orders } = await this.orderModel.findAndCountAll({
        where: whereClause,
        limit: parseInt(limit.toString()),
        offset: offset,
        order: [['created_at', 'DESC']],
        include: [
          {
            model: this.userModel,
            as: 'user',
            attributes: ['id', 'fullName', 'email', 'phone'],
          },
          {
            model: this.orderItemModel,
            as: 'orderItems',
            include: [
              {
                model: this.drinkModel,
                as: 'drink',
                attributes: ['id', 'name', 'image_url'],
              },
            ],
          },
        ],
      });

      console.log('🔍 Query result:', { count, ordersCount: orders.length });
      if (orders.length > 0) {
        console.log('🔍 First order sample:', {
          id: orders[0].id,
          order_number: orders[0].order_number,
          status: orders[0].status,
          user: orders[0].user ? orders[0].user.fullName : 'No user',
          orderItemsCount: orders[0].orderItems ? orders[0].orderItems.length : 0
        });
      }

      return {
        orders,
        total: count,
        page: parseInt(page.toString()),
        limit: parseInt(limit.toString()),
        totalPages: Math.ceil(count / limit),
      };
    } catch (error) {
      console.error('❌ Error fetching orders:', error);
      return {
        orders: [],
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0
      };
    }
  }

  async getOrderById(orderId: string) {
    try {
      console.log('👁️ Fetching order details for ID:', orderId);
      
      const order = await this.orderModel.findByPk(orderId, {
        include: [
          {
            model: this.userModel,
            as: 'user',
            attributes: ['id', 'fullName', 'email', 'phone'],
          },
          {
            model: this.orderItemModel,
            as: 'orderItems',
            include: [
              {
                model: this.drinkModel,
                as: 'drink',
                attributes: ['id', 'name', 'image_url', 'price'],
              },
            ],
          },
        ],
      });

      if (!order) {
        throw new Error('Order not found');
      }

      console.log('✅ Order details fetched successfully');
      return order;
    } catch (error) {
      console.error('❌ Error fetching order details:', error);
      throw error;
    }
  }

  async updateOrderStatus(orderId: string, status: string) {
    try {
      console.log('🔄 Updating order status:', { orderId, status });
      
      // Kiểm tra order có tồn tại không
      const order = await this.orderModel.findByPk(orderId);
      if (!order) {
        throw new Error(`Order with ID ${orderId} not found`);
      }
      
      console.log('📋 Order found:', { id: order.id, currentStatus: order.status });
      
      // Cập nhật trực tiếp bằng raw SQL
      const result = await this.orderModel.sequelize?.query(
        'UPDATE orders SET status = ? WHERE id = ?',
        { replacements: [status, orderId] }
      );
      
      console.log('🔍 SQL result:', result);
      
      // Kiểm tra lại sau khi update
      const updatedOrder = await this.orderModel.findByPk(orderId);
      console.log('✅ Order after update:', { id: updatedOrder?.id, newStatus: updatedOrder?.status });
      
      return { message: 'Order status updated successfully', order: updatedOrder };
    } catch (error) {
      console.error('❌ Error updating order status:', error);
      throw new Error(`Failed to update order status: ${error.message}`);
    }
  }

}
