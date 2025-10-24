import { Injectable } from '@nestjs/common';

@Injectable()
export class OtpService {
  private otpStore = new Map<string, { otp: string; expires: number; type: string }>();

  generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  storeOtp(email: string, otp: string, type: 'register' | 'forgot' = 'register'): void {
    const expires = Date.now() + 5 * 60 * 1000; // 5 phút
    this.otpStore.set(email, { otp, expires, type });
  }

  verifyOtp(email: string, otp: string, type: 'register' | 'forgot' = 'register'): boolean {
    const stored = this.otpStore.get(email);
    if (!stored) return false;
    
    if (stored.expires < Date.now()) {
      this.otpStore.delete(email);
      return false;
    }

    if (stored.otp !== otp || stored.type !== type) {
      return false;
    }

    this.otpStore.delete(email);
    return true;
  }

  cleanupExpiredOtps(): void {
    const now = Date.now();
    for (const [email, data] of this.otpStore.entries()) {
      if (data.expires < now) {
        this.otpStore.delete(email);
      }
    }
  }
}
