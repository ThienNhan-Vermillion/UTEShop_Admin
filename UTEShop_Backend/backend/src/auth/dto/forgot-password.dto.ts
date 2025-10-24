import { IsNotEmpty, IsEmail } from 'class-validator';

export class ForgotPasswordDto {
  @IsNotEmpty({ message: 'Vui lòng nhập email' })
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email: string;
}

export class ResetPasswordDto {
  @IsNotEmpty({ message: 'Vui lòng nhập email' })
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email: string;

  @IsNotEmpty({ message: 'Vui lòng nhập OTP' })
  otp: string;

  @IsNotEmpty({ message: 'Vui lòng nhập mật khẩu mới' })
  newPassword: string;

  @IsNotEmpty({ message: 'Vui lòng xác nhận mật khẩu mới' })
  confirmPassword: string;
}
