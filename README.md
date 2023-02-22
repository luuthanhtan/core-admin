# Lời đầu tiên

Đây là dự án [Laravel](https://laravel.com/) sử dụng Services để phân hệ thống.

## Bắt đầu

Chạy lệnh:

```bash
cp .env.example .env
```

```bash
php artisan sail:install
```

Đặt lệnh định nghĩa cho `./vendor/bin/sail` là `sail`

```bash
alias sail='[ -f sail ] && sh sail || sh vendor/bin/sail'
```

```bash
sail up -d --build
```

```bash
npm run dev
```

## Cấu hình thông tin kết nối database trong .env
Sử dụng mặc định của sail

```text
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=sail
DB_PASSWORD=password
```

Chạy lệnh tạo database và thêm dữ liệu mẫu:

```bash
sail php artisan migrate --seed
```

Có thể chạy factory để tạo dự liệu thêm

```bash
sail php artisan tinker
```

Tạo 10 user ảo (password:12345678)

```bash
App\Models\User::factory(10)->create()
```

## Nếu sử dụng Passport

```bash
sail php artisan passport:client --password
```

Lấy client-id và client-secret
Thêm vào .env

```bash
PASSPORT_PASSWORD_GRANT_CLIENT_ID="client-id-value"
PASSPORT_PASSWORD_GRANT_CLIENT_SECRET="unhashed-client-secret-value"
```

Chạy lệnh
```bash
sail php artisan serve --port=812
```