# UTEShop Admin Panel

## Tổng quan
Project Admin Panel sử dụng Next.js (Frontend) và NestJS (Backend) với chức năng xác thực đầy đủ bao gồm Login, Register, và Forgot Password với OTP qua email.

## Cấu trúc Project

### Backend (NestJS)
- **Framework**: NestJS với TypeScript
- **Database**: MySQL (sử dụng chung database với UTEShop)
- **ORM**: Sequelize
- **Authentication**: JWT + bcrypt
- **Email**: Nodemailer cho OTP

### Frontend (Next.js)
- **Framework**: Next.js 16 với TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **HTTP Client**: Axios

## Cài đặt và Chạy

### Backend (NestJS)

1. **Cài đặt dependencies**:
```bash
cd Admin/UTEShop_Backend/backend
npm install
```

2. **Cấu hình environment**:
Tạo file `.env` trong thư mục `Admin/UTEShop_Backend/backend/`:
```env
# Database
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=123456
MYSQL_DB=uteshop

# JWT
JWT_SECRET=dev_jwt_secret_change_me

# Email (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Server
PORT=3001
FRONTEND_ORIGIN=http://localhost:3000
```

3. **Chạy backend**:
```bash
npm run start:dev
```

### Frontend (Next.js)

1. **Cài đặt dependencies**:
```bash
cd Admin/UTEShop_Frontend/my-next-app
npm install
```

2. **Cấu hình environment**:
Tạo file `.env.local` trong thư mục `Admin/UTEShop_Frontend/my-next-app/`:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

3. **Chạy frontend**:
```bash
npm run dev
```

## Chức năng đã triển khai

### Authentication
- ✅ **Login**: Đăng nhập với username/password
- ✅ **Register**: Đăng ký với OTP xác thực qua email
- ✅ **Forgot Password**: Quên mật khẩu với OTP qua email
- ✅ **Validation**: Validation đầy đủ cho tất cả forms
- ✅ **JWT**: Sử dụng JWT cho authentication

### API Endpoints

#### Auth Endpoints
- `POST /auth/login` - Đăng nhập
- `GET /auth/check-username?username=xxx` - Kiểm tra username có sẵn
- `GET /auth/check-email?email=xxx` - Kiểm tra email có sẵn
- `POST /auth/register/request-otp` - Gửi OTP đăng ký
- `POST /auth/register/confirm` - Xác nhận OTP đăng ký
- `POST /auth/forgot-password` - Gửi OTP quên mật khẩu
- `POST /auth/reset-password` - Đặt lại mật khẩu

### Frontend Pages
- `/` - Trang chủ với thông tin user
- `/login` - Trang đăng nhập
- `/register` - Trang đăng ký
- `/forgot-password` - Trang quên mật khẩu

## Cấu hình Email

Để sử dụng chức năng OTP qua email, cần cấu hình Gmail:

1. Bật 2-Factor Authentication cho Gmail
2. Tạo App Password
3. Cập nhật `SMTP_USER` và `SMTP_PASS` trong file `.env`

## Database

Project sử dụng chung database MySQL với UTEShop project. Bảng `users` đã có sẵn với cấu trúc:
- `id` (Primary Key)
- `fullName`
- `username` (Unique)
- `password` (Hashed)
- `email` (Unique)
- `dob`
- `phone`
- `address`
- `loyalty_points`

## Lưu ý

- Backend chạy trên port 3001
- Frontend chạy trên port 3000
- Cần cấu hình CORS cho phép frontend gọi API
- Sử dụng localStorage để lưu token và user info
- OTP có thời hạn 5 phút
- JWT token có thời hạn 7 ngày
