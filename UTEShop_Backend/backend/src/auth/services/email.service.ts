import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  
  private transporter;

  constructor() {
    // Kiểm tra cấu hình SMTP
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.log('📧 SMTP not configured - Using mock email service');
      console.log('   To enable real email sending, set SMTP_USER and SMTP_PASS environment variables');
      this.transporter = null;
      return;
    }

    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendOtpEmail(email: string, otp: string, type: 'register' | 'forgot' = 'register'): Promise<void> {
    const subject = type === 'register' ? 'Xác thực đăng ký tài khoản' : 'Đặt lại mật khẩu';
    
    // Mock email for development
    if (!this.transporter) {
      console.log('📧 Mock Email Service:');
      console.log(`   To: ${email}`);
      console.log(`   Subject: ${subject}`);
      console.log(`   OTP: ${otp}`);
      console.log('   ⚠️  This is a mock email. In production, configure SMTP settings.');
      return;
    }

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">${subject}</h2>
        <p>Mã OTP của bạn là: <strong style="font-size: 24px; color: #007bff;">${otp}</strong></p>
        <p>Mã này có hiệu lực trong 5 phút.</p>
        <p>Nếu bạn không yêu cầu mã này, vui lòng bỏ qua email này.</p>
      </div>
    `;

    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject,
      html,
    });
  }
}
