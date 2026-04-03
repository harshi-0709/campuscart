# Campus Cart 🛒

A student marketplace — buy and sell within your campus.

---

## Project Structure

```
campus-cart/
├── backend/          ← Node.js + Express + MongoDB API
│   ├── server.js
│   ├── .env
│   ├── models/
│   │   ├── User.js
│   │   └── Listing.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── listings.js
│   │   └── users.js
│   ├── middleware/
│   │   └── auth.js
│   └── uploads/      ← image files stored here
│
└── frontend/         ← Plain HTML/CSS/JS
    ├── landing.html
    ├── index.html
    ├── login.html
    ├── register.html
    ├── create.html
    ├── listing.html
    ├── style.css
    └── app.js
```

---

## Setup

### 1. Install MongoDB
- Download from https://www.mongodb.com/try/download/community
- Or use MongoDB Atlas (free cloud): https://www.mongodb.com/atlas
  - Create a cluster → get connection string → paste in `.env`

### 2. Start the Backend
```bash
cd backend
npm install
# Edit .env if needed (especially MONGO_URI for Atlas)
node server.js
```
Server runs at **http://localhost:5000**

### 3. Open the Frontend
Just open `frontend/landing.html` in your browser.
> No build step needed — pure HTML/CSS/JS.

---

## API Endpoints

| Method | Endpoint | Auth? | Description |
|--------|----------|-------|-------------|
| POST | /api/auth/register | ❌ | Register new user |
| POST | /api/auth/login | ❌ | Login, get JWT |
| GET | /api/listings | ❌ | Get all listings (filterable) |
| GET | /api/listings/:id | ❌ | Get single listing |
| POST | /api/listings | ✅ | Create listing (with image upload) |
| PUT | /api/listings/:id | ✅ | Update own listing |
| DELETE | /api/listings/:id | ✅ | Delete own listing |
| GET | /api/users/me | ✅ | Get own profile |
| GET | /api/users/my-listings | ✅ | Get own listings |
| PUT | /api/users/me | ✅ | Update profile |

### Query Params for GET /api/listings
- `?search=textbook` — search by title
- `?category=Books` — filter by category
- `?minPrice=100&maxPrice=500` — price range
- `?college=VIT` — filter by college

---

## Upgrading to Cloudinary (Optional)
For production, replace `multer` disk storage with Cloudinary:
```bash
npm install cloudinary multer-storage-cloudinary
```
Add to `.env`:
```
CLOUDINARY_CLOUD_NAME=your_cloud
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

---

## Tech Stack
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT, bcrypt, Multer
- **Frontend**: HTML5, CSS3, Vanilla JS
- **Fonts**: Syne + DM Sans (Google Fonts)
