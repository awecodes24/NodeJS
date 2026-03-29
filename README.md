# NodeJS REST API — Full Documentation

A beginner-friendly Node.js REST API built with **Express** and **MongoDB (Mongoose)**, featuring user registration/login with password hashing and full CRUD operations for both users and blog posts.

---

## 📁 Project Structure

```
NodeJS-main/
├── app.js                  # Main application entry point
├── database/
│   └── connection.js       # MongoDB connection setup
├── models/
│   ├── userModel.js        # User Mongoose schema & model
│   └── blog.js             # Blog Mongoose schema & model
├── .gitignore
└── README.md
```

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express | Web framework / routing |
| MongoDB | NoSQL database |
| Mongoose | MongoDB ODM (Object Document Mapper) |
| bcrypt | Password hashing |
| dotenv | Environment variable management |

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js installed
- MongoDB instance (local or Atlas)

### Steps

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd NodeJS-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root directory:
   ```env
   CONNECTION_STRING=mongodb://localhost:27017/yourdbname
   # or for MongoDB Atlas:
   # CONNECTION_STRING=mongodb+srv://<username>:<password>@cluster.mongodb.net/yourdbname
   ```

4. **Run the server**
   ```bash
   node app.js
   ```
   The server starts at **http://localhost:3000**

---

## 🗄️ Database Connection

File: `database/connection.js`

```js
import mongoose from "mongoose"

async function dbConnection() {
    await mongoose.connect(process.env.CONNECTION_STRING)
    console.log("DB connected successfully!!!!")
}

export default dbConnection
```

- Uses `mongoose.connect()` with the connection string from `.env`
- Called once at startup in `app.js`

---

## 📐 Data Models

### User Model (`models/userModel.js`)

```js
{
    name     : String,
    email    : String,
    password : String   // stored as bcrypt hash
}
```

### Blog Model (`models/blog.js`)

```js
{
    title       : String,
    subtitle    : String,
    description : String
}
```

---

## 🔗 API Endpoints

### General

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Home page response |
| GET | `/about` | About page with static info |
| GET | `/greet` | Returns "Namaste World!!" |

---

### 👤 User Endpoints

#### Register a User
```
POST /register
```
**Request Body:**
```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "mypassword"
}
```
**Response:**
```json
{ "message": "User registered successfully!" }
```
> Password is hashed using `bcrypt` with 10 salt rounds before saving.

---

#### Login
```
POST /login
```
**Request Body:**
```json
{
    "email": "john@example.com",
    "password": "mypassword"
}
```
**Responses:**
```json
{ "message": "logged in successfully" }
{ "message": "Email not registered" }
{ "message": "Invalid password" }
```
> Uses `bcrypt.compareSync()` to verify the hashed password.

---

#### Get All Users
```
GET /fetch-users
```
**Response:**
```json
{ "data": [ { "_id": "...", "name": "...", "email": "..." }, ... ] }
```

---

#### Get User by ID
```
GET /fetch-users/:id
```
Returns user data **excluding** `password` and `__v` fields.

---

#### Update User
```
PATCH /update-user/:id
```
**Request Body:**
```json
{
    "name": "New Name",
    "email": "new@example.com",
    "password": "newpassword"
}
```
> Password is re-hashed on update.

---

#### Delete User by URL Param
```
DELETE /delete/:id
```

#### Delete User by Body
```
DELETE /delete
```
**Request Body:**
```json
{ "id": "<user_id>" }
```

---

### 📝 Blog Endpoints

#### Create a Blog
```
POST /create-blog
```
**Request Body:**
```json
{
    "title": "My First Blog",
    "subtitle": "An introduction",
    "description": "This is the content..."
}
```
**Response:**
```json
{ "message": "Blog created!" }
```

---

#### Get All Blogs
```
GET /blogs
```

---

#### Get Blog by ID
```
GET /blogs/:id
```
Returns blog data **excluding** `title` and `subtitle` fields (only `description` is returned).

---

#### Update Blog
```
PATCH /update-blog/:id
```
**Request Body:**
```json
{
    "title": "Updated Title",
    "subtitle": "Updated Subtitle",
    "description": "Updated content"
}
```
**Response:**
```json
{ "message": "blog updated successfully" }
```

---

#### Delete Blog
```
DELETE /blogs/delete/:id
```
**Response:**
```json
{ "message": "Blog deleted" }
```

---

## 🔒 Security Notes

- Passwords are **never stored in plain text** — bcrypt hashing is applied on both registration and update.
- Sensitive fields (like `password`) are excluded from user fetch responses using Mongoose's `.select()`.
- The MongoDB connection string is stored in `.env` and never hardcoded.

---

## ⚠️ Known Issues / TODOs

- No authentication middleware (JWT or session-based) — all endpoints are currently open.
- No input validation (e.g., email format, required fields).
- The `/update-user/:id` route has a bug: `password` is set from `req.body.name` instead of `req.body.password`.
- No error handling on create/update/delete routes (only fetch routes have try/catch).
- The server `app.listen()` is placed before the `/login` route definition — while it works, routes should ideally all be defined before `listen()`.

---

## 📄 .gitignore

The project ignores:
```
node_modules/
```

---

## 🚀 Example Usage with cURL

```bash
# Register
curl -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@test.com","password":"secret"}'

# Login
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@test.com","password":"secret"}'

# Get all users
curl http://localhost:3000/fetch-users

# Create blog
curl -X POST http://localhost:3000/create-blog \
  -H "Content-Type: application/json" \
  -d '{"title":"Hello","subtitle":"World","description":"My first blog post."}'
```
