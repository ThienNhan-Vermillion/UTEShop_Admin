import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'users',
  timestamps: false, // vì bảng có sẵn, không tự thêm createdAt, updatedAt
})
export class Users extends Model<Users> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare fullName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare email: string;

  @Column({
    type: DataType.DATEONLY, // yyyy-mm-dd
    allowNull: false,
  })
  declare dob: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare phone: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare address: string;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
    comment: 'Tổng số điểm tích lũy xu hiện có',
  })
  declare loyalty_points: number;
}
