# Hệ thống Quản lý Thư viện Mini (Mini Library Management System)

Một dự án full-stack đơn giản để quản lý thư viện, áp dụng kiến trúc 3 lớp và các công nghệ hiện đại như React, Node.js, Express và MongoDB.

## link deploy: https://book-manager-jet.vercel.app/

## Mục lục

- [Báo cáo ngắn](#báo-cáo-ngắn)
  - [Kiến trúc hệ thống](#1-kiến-trúc-hệ-thống)
  - [Sơ đồ lớp (UML)](#2-sơ-đồ-lớp-uml)
  - [Sơ đồ Cơ sở dữ liệu (MongoDB)](#3-sơ-đồ-cơ-sở-dữ-liệu-mongodb)
- [Tính năng](#tính-năng)
- [Công nghệ sử dụng](#công-nghệ-sử-dụng)
- [Hướng dẫn cài đặt và chạy chương trình](#hướng-dẫn-cài-đặt-và-chạy-chương-trình)
- [Tài khoản Demo](#tài-khoản-demo)

---

## Báo cáo ngắn

### 1. Kiến trúc hệ thống

Hệ thống được xây dựng dựa trên **kiến trúc 3 lớp (3-Tier Architecture)** và mô hình **Client-Server**:

- **Presentation Layer (Frontend - ReactJS):** Là giao diện người dùng (UI) được xây dựng bằng React. Lớp này chịu trách nhiệm hiển thị dữ liệu và xử lý tương tác từ người dùng. Mọi yêu cầu nghiệp vụ đều được gửi đến Backend thông qua REST API.

- **Business Logic Layer (Backend - Node.js/Express):** Là bộ não của hệ thống, xử lý tất cả các yêu cầu từ client. Lớp này thực thi các quy tắc nghiệp vụ như xác thực người dùng, phân quyền, kiểm tra logic mượn/trả sách, và giao tiếp với lớp Data Access để thao tác dữ liệu.

- **Data Access Layer (Database - MongoDB):** Là nơi lưu trữ toàn bộ dữ liệu của ứng dụng. Chúng tôi sử dụng MongoDB, một cơ sở dữ liệu NoSQL, với Mongoose ODM để định nghĩa schema và tương tác với dữ liệu một cách có cấu trúc.

**Luồng hoạt động:** Người dùng tương tác với UI (React) -> React gửi HTTP request đến API (Node.js) -> Node.js xử lý logic và gọi đến MongoDB -> MongoDB trả dữ liệu về cho Node.js -> Node.js phản hồi lại cho React -> React cập nhật lại giao diện.

### 2. Sơ đồ lớp (UML)

Sơ đồ lớp đơn giản mô tả các thực thể chính của hệ thống.

```plaintext
+----------------+       +----------------+       +----------------+
|      User      |       |      Book      |       |   Borrowing    |
+----------------+       +----------------+       +----------------+
| - username     |       | - title        |       | - user (ref)   |
| - password     |       | - author       |       | - book (ref)   |
| - role         |       | - genre        |       | - borrowDate   |
+----------------+       | - quantity     |       | - returnDate   |
| + register()   |       +----------------+       | - status       |
| + login()      |       | + create()     |       +----------------+
+----------------+       | + update()     |       | + borrow()     |
                         | + delete()     |       | + return()     |
                         +----------------+       +----------------+
```

### 3. Sơ đồ Cơ sở dữ liệu (MongoDB)

Hệ thống sử dụng 3 collections chính trong cơ sở dữ liệu `mini_library`:

- **`users`**: Lưu trữ thông tin người dùng.
  ```json
  {
    "_id": ObjectId(),
    "username": "admin",
    "password": "hashed_password",
    "role": "admin" // "user" or "admin"
  }
  ```

- **`books`**: Lưu trữ thông tin về các đầu sách trong thư viện.
  ```json
  {
    "_id": ObjectId(),
    "title": "Lập trình ReactJS",
    "author": "Tác giả A",
    "genre": "Công nghệ",
    "quantity": 10
  }
  ```

- **`borrowings`**: Ghi log các hoạt động mượn/trả sách.
  ```json
  {
    "_id": ObjectId(),
    "user": ObjectId("ref_to_users_collection"),
    "book": ObjectId("ref_to_books_collection"),
    "borrowDate": ISODate("2025-09-29T..."),
    "returnDate": null,
    "status": "borrowed" // "borrowed" or "returned"
  }
  ```

---

## Tính năng

- **Xác thực & Phân quyền:** Đăng ký, đăng nhập với vai trò Admin và User.
- **Quản lý sách (Admin):** Thêm, sửa, xóa sách.
- **Tìm kiếm sách:** Tìm kiếm theo tên hoặc tác giả ngay trên trang chủ.
- **Quản lý mượn/trả:**
  - Người dùng có thể mượn sách.
  - Xem lịch sử mượn và thực hiện trả sách.
  - Hệ thống tự động kiểm tra và cập nhật số lượng sách còn lại.
- **Ghi log:** Mọi hoạt động mượn/trả đều được ghi lại.

---

## Công nghệ sử dụng

- **Frontend:** ReactJS, React Router, Axios, CSS.
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB với Mongoose.
- **Xác thực:** JSON Web Tokens (JWT).

---

## Hướng dẫn cài đặt và chạy chương trình

### Yêu cầu

- Node.js (v16 trở lên)
- npm
- MongoDB (cài đặt local hoặc sử dụng MongoDB Atlas)

### 1. Cài đặt Backend

```bash
# 1. Di chuyển vào thư mục backend
cd backend

# 2. Cài đặt các gói phụ thuộc
npm install

# 3. Tạo file .env ở thư mục backend và điền thông tin
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_super_secret_key

# 4. (Tùy chọn) Thêm dữ liệu mẫu (bao gồm tài khoản admin)
npm run data:import

# 5. Khởi động server backend
npm run server
```
Server sẽ chạy tại `http://localhost:5001`.

### 2. Cài đặt Frontend

```bash
# 1. Mở một terminal mới, di chuyển vào thư mục frontend
cd frontend

# 2. Cài đặt các gói phụ thuộc
npm install

# 3. Khởi động ứng dụng React
npm start
```
Ứng dụng sẽ tự động mở trên trình duyệt tại `http://localhost:3000`.

---

## Tài khoản Demo

Sau khi chạy `npm run data:import`, bạn có thể sử dụng các tài khoản sau để trải nghiệm:

- **Tài khoản Admin:**
  - **Username:** `admin`
  - **Password:** `admin`

- **Tài khoản User:**
  - **Username:** `user`
  - **Password:** `user`