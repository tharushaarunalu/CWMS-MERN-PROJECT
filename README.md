# 🚗 Car Wash Management System (CWMS-MERN)

A premium, modern, and high-performance Car Wash Management System built with the **MERN stack**, featuring a stunning **Three.js** 3D interface and **AI-powered** assistance via Google Gemini.

---

## ✨ Features

- **🚀 Interactive 3D UI**: Stylized 3D car models and dynamic neon speed lines powered by Three.js for a premium user experience.
- **📅 Smart Booking System**: Seamlessly add, edit, and manage car wash bookings with real-time validation.
- **🤖 AI Assistant**: Integrated Google Gemini AI to answer user queries and provide service recommendations.
- **📊 Admin Dashboard**: Comprehensive control panel for managing all bookings and monitoring system status.
- **🔍 Advanced Search**: Quickly locate specific bookings or customer records.
- **📱 Fully Responsive**: Optimized for mobile, tablet, and desktop views using glassmorphic design principles.

---

## 🛠️ Tech Stack

### Frontend
- **React.js** (Hooks, Router)
- **Three.js** (@react-three/fiber & @react-three/drei)
- **Vanilla CSS** (Premium Glassmorphism & HSL Color System)
- **Axios** (API Communication)

### Backend
- **Node.js & Express**
- **MongoDB & Mongoose** (Database)
- **Google Gemini API** (AI Intelligence)
- **JWT / Session Management** (Authentication)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB (Local or Atlas)
- Gemini API Key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tharushaarunalu/CWMS-MERN.git
   cd CWMS-MERN
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` folder:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_uri
   GEMINI_API_KEY=your_api_key
   SESSION_SECRET=your_secret
   ```
   Start the backend:
   ```bash
   npm start
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   npm start
   ```

---

## 📸 Screenshots

*(Add your screenshots here to make it look even better on GitHub!)*

---

## 🌐 Deployment

### Frontend (GitHub Pages / Vercel / Netlify)
Since this is a React app, you can deploy the frontend to **GitHub Pages**:
1. Install `gh-pages`: `npm install gh-pages --save-dev`
2. Add `"homepage": "https://your-username.github.io/CWMS-MERN"` to `frontend/package.json`.
3. Add deploy scripts to `package.json`.
4. Run `npm run deploy`.

### Backend & Database (Render / Railway / Atlas)
**Important:** GitHub Pages only hosts static files (frontend). For the **MERN** functionality to work, you must host the backend separately:
- **Backend**: Use [Render](https://render.com/) or [Railway](https://railway.app/).
- **Database**: Use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Free Tier).
- **Environment Variables**: Ensure you set your `MONGO_URI` and `GEMINI_API_KEY` in your hosting provider's settings.

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## 📄 License

This project is licensed under the ISC License.

---

**Developed with ❤️ by [Tharusha Arunalu](https://github.com/tharushaarunalu)**
