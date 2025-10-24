import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class OtpDto {
  @IsNotEmpty({ message: 'Vui lòng nhập OTP' })
  @Matches(/^[0-9]{6}$/, { message: 'OTP phải gồm 6 chữ số' })
  otp: string;
}
