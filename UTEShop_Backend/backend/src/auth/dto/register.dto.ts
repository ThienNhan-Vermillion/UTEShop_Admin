import { IsNotEmpty, IsString, IsEmail, IsOptional, IsDateString, Matches, MinLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({ message: 'Vui lòng nhập họ và tên' })
  @IsString()
  fullName: string;

  @IsNotEmpty({ message: 'Vui lòng nhập tên đăng nhập' })
  @IsString()
  username: string;

  @IsNotEmpty({ message: 'Vui lòng nhập email' })
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email: string;

  @IsNotEmpty({ message: 'Vui lòng nhập số điện thoại' })
  @Matches(/^[0-9]{10,11}$/, { message: 'Số điện thoại không hợp lệ' })
  phone: string;

  @IsNotEmpty({ message: 'Vui lòng nhập ngày sinh' })
  @IsDateString({}, { message: 'Ngày sinh phải theo định dạng yyyy-mm-dd' })
  dob: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsNotEmpty({ message: 'Vui lòng nhập mật khẩu' })
  @MinLength(8, { message: 'Mật khẩu phải ít nhất 8 ký tự' })
  password: string;
}
