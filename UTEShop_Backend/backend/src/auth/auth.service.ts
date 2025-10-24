import { Injectable, UnauthorizedException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Users } from '../models/user.model';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { OtpDto } from './dto/otp.dto';
import { ForgotPasswordDto, ResetPasswordDto } from './dto/forgot-password.dto';
import { EmailService } from './services/email.service';
import { OtpService } from './services/otp.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users)
    private userModel: typeof Users,
    private jwtService: JwtService,
    private emailService: EmailService,
    private otpService: OtpService,
  ) {}

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    const user = await this.userModel.findOne({ where: { username } });
    if (!user) {
      throw new UnauthorizedException('Thông tin đăng nhập không chính xác');
    }

    // Debug logging
    console.log('User found:', { id: user.id, username: user.username, hasPassword: !!user.password });

    // Kiểm tra password có tồn tại không
    if (!user.password) {
      console.log('Password is null/undefined for user:', username);
      throw new UnauthorizedException('Thông tin đăng nhập không chính xác');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Thông tin đăng nhập không chính xác');
    }

    const payload = { id: user.id, username: user.username };
    const token = this.jwtService.sign(payload, { expiresIn: '7d' });

    return {
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
      },
    };
  }

  async checkUsernameAvailable(username: string) {
    const user = await this.userModel.findOne({ where: { username } });
    return { available: !user };
  }

  async checkEmailAvailable(email: string) {
    const user = await this.userModel.findOne({ where: { email } });
    return { available: !user };
  }

  async registerRequestOtp(registerDto: RegisterDto) {
    const { username, email } = registerDto;

    // Kiểm tra username và email đã tồn tại
    const existingUser = await this.userModel.findOne({
      where: { username },
    });
    if (existingUser) {
      throw new ConflictException('Tên đăng nhập đã được sử dụng');
    }

    const existingEmail = await this.userModel.findOne({
      where: { email },
    });
    if (existingEmail) {
      throw new ConflictException('Email đã được sử dụng');
    }

    // Tạo OTP và gửi email
    const otp = this.otpService.generateOtp();
    this.otpService.storeOtp(email, otp, 'register');
    
    await this.emailService.sendOtpEmail(email, otp, 'register');

    return { message: 'OTP đã được gửi đến email của bạn' };
  }

  async registerConfirm(body: OtpDto & RegisterDto) {
    const { otp, email, password, fullName, username, phone, dob, address } = body;

    // Xác thực OTP
    if (!this.otpService.verifyOtp(email, otp, 'register')) {
      throw new BadRequestException('OTP không hợp lệ hoặc đã hết hạn');
    }

    // Hash password và tạo user
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const userData: any = {
      fullName,
      username,
      email,
      phone,
      dob,
      password: hashedPassword,
    };
    
    if (address) {
      userData.address = address;
    }
    
    console.log('Creating user with data:', { ...userData, password: '[HASHED]' });
    const user = await this.userModel.create(userData);
    console.log('User created successfully:', { id: user.id, username: user.username });

    return { message: 'Đăng ký thành công', user: { id: user.id, username: user.username } };
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const { email } = forgotPasswordDto;

    const user = await this.userModel.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException('Email không tồn tại trong hệ thống');
    }

    const otp = this.otpService.generateOtp();
    this.otpService.storeOtp(email, otp, 'forgot');
    
    await this.emailService.sendOtpEmail(email, otp, 'forgot');

    return { message: 'OTP đã được gửi đến email của bạn' };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { email, otp, newPassword, confirmPassword } = resetPasswordDto;

    if (newPassword !== confirmPassword) {
      throw new BadRequestException('Mật khẩu xác nhận không khớp');
    }

    // Xác thực OTP
    if (!this.otpService.verifyOtp(email, otp, 'forgot')) {
      throw new BadRequestException('OTP không hợp lệ hoặc đã hết hạn');
    }

    const user = await this.userModel.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException('Email không tồn tại trong hệ thống');
    }

    // Cập nhật mật khẩu
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await user.update({ password: hashedPassword });

    return { message: 'Đặt lại mật khẩu thành công' };
  }
}
