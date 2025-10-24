import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';

@Table({ tableName: 'users', timestamps: false })
export class UTEShopUser extends Model<UTEShopUser> {
  declare id: number;
  
  @Column({ type: DataType.STRING, allowNull: false })
  declare fullName: string;
  
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare username: string;
  
  @Column({ type: DataType.STRING, allowNull: false })
  declare password: string;
  
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare email: string;
  
  @Column({ type: DataType.DATEONLY, allowNull: false })
  declare dob: string;
  
  @Column({ type: DataType.STRING, allowNull: false })
  declare phone: string;
  
  @Column({ type: DataType.STRING })
  declare address: string;
  
  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  declare loyalty_points: number;

  @HasMany(() => UTEShopOrder, 'user_id')
  declare orders: UTEShopOrder[];
}

@Table({ tableName: 'drinks', timestamps: false })
export class UTEShopDrink extends Model<UTEShopDrink> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: number;
  
  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;
  
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare slug: string;
  
  @Column({ type: DataType.TEXT })
  declare description: string;
  
  @Column({ type: DataType.DECIMAL(12, 2), allowNull: false })
  declare price: number;
  
  @Column({ type: DataType.DECIMAL(12, 2) })
  declare salePrice: number;
  
  @Column({ type: DataType.STRING })
  declare size: string;
  
  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  declare stock: number;
  
  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  declare views: number;
  
  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  declare sold: number;
  
  @Column({ type: DataType.STRING })
  declare image_url: string;
  
  @Column({ type: DataType.INTEGER })
  declare category_id: number;
  
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare is_hidden: boolean;
  
  @Column({ type: DataType.DATE })
  declare created_at: Date;
  
  @Column({ type: DataType.DATE })
  declare updated_at: Date;

  @HasMany(() => UTEShopOrderItem, 'drink_id')
  declare orderItems: UTEShopOrderItem[];
}

@Table({ tableName: 'orders', timestamps: false })
export class UTEShopOrder extends Model<UTEShopOrder> {
  declare id: number;
  
  @ForeignKey(() => UTEShopUser)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare user_id: number;
  
  @Column({ type: DataType.STRING(50), allowNull: false, unique: true })
  declare order_number: string;
  
  @Column({ 
    type: DataType.ENUM('pending', 'confirmed', 'preparing', 'shipping', 'delivered', 'cancelled'),
    defaultValue: 'pending',
    allowNull: false 
  })
  declare status: string;
  
  @Column({ 
    type: DataType.ENUM('COD', 'BANKING', 'MOMO'),
    allowNull: false 
  })
  declare payment_method: string;
  
  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  declare subtotal: number;
  
  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false, defaultValue: 0 })
  declare shipping_fee: number;
  
  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  declare total: number;
  
  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  declare loyalty_points_used: number;
  
  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  declare loyalty_points_earned: number;
  
  @Column({ type: DataType.TEXT })
  declare shipping_address: string;
  
  @Column({ type: DataType.STRING(20) })
  declare shipping_phone: string;
  
  @Column({ type: DataType.TEXT })
  declare notes: string;
  
  @Column({ type: DataType.DATE })
  declare cancelled_at: Date;
  
  @Column({ type: DataType.TEXT })
  declare cancelled_reason: string;
  
  @Column({ type: DataType.DATE })
  declare confirmed_at: Date;
  
  @Column({ type: DataType.DATE })
  declare preparing_at: Date;
  
  @Column({ type: DataType.DATE })
  declare shipping_at: Date;
  
  @Column({ type: DataType.DATE })
  declare delivered_at: Date;
  
  @Column({ type: DataType.DATE })
  declare created_at: Date;
  
  @Column({ type: DataType.DATE })
  declare updated_at: Date;

  @BelongsTo(() => UTEShopUser, 'user_id')
  declare user: UTEShopUser;

  @HasMany(() => UTEShopOrderItem, 'order_id')
  declare orderItems: UTEShopOrderItem[];
}

@Table({ tableName: 'order_items', timestamps: false })
export class UTEShopOrderItem extends Model<UTEShopOrderItem> {
  declare id: number;
  
  @ForeignKey(() => UTEShopOrder)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare order_id: number;
  
  @ForeignKey(() => UTEShopDrink)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare drink_id: number;
  
  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 1 })
  declare quantity: number;
  
  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  declare price: number;
  
  @Column({ type: DataType.STRING(50) })
  declare size: string;
  
  @Column({ type: DataType.STRING(50) })
  declare ice_level: string;
  
  @Column({ type: DataType.STRING(50) })
  declare sugar_level: string;
  
  @Column({ type: DataType.TEXT })
  declare notes: string;
  
  @Column({ type: DataType.DATE })
  declare created_at: Date;
  
  @Column({ type: DataType.DATE })
  declare updated_at: Date;

  @BelongsTo(() => UTEShopOrder, 'order_id')
  declare order: UTEShopOrder;

  @BelongsTo(() => UTEShopDrink, 'drink_id')
  declare drink: UTEShopDrink;
}
