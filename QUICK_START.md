# 🚀 Quick Start Guide - HarborLeaf Radio Admin

## Prerequisites
- Node.js (v18 or higher)
- Backend server running (harborleaf_radio_backend)

## Installation (5 minutes)

### Step 1: Navigate to Project
```bash
cd C:\FlutterDev\project\Clone\harborleaf_radio_admin
```

### Step 2: Install Dependencies (Already Done ✅)
```bash
npm install
```

### Step 3: Configure Environment
The `.env` file is already created with:
```
VITE_API_URL=http://localhost:5000/api
```

Update if your backend runs on a different URL.

### Step 4: Start Development Server
```bash
npm run dev
```

Server will start on: http://localhost:5173 (or next available port)

## Login Credentials

**Default Admin:**
- Email: `admin@harborleaf.com`
- Password: (check your backend configuration)

**Test Account:**
- Email: `test@example.com`
- Password: `password123`

## Features Overview

### 📊 Dashboard (`/`)
- **Stats Cards**: Total Users, Active Frequencies, Private Frequencies, Daily Active Users
- **Active Frequencies Table**: Real-time view of all active frequencies
- **Private Frequencies Table**: Live countdown timers
- **Charts**: Daily active users (bar), User growth (line)

### 👥 Users (`/users`)
- Search users by name, email, or phone
- View user details in modal
- See online/offline status
- Pagination support
- Delete users

### 📡 Frequencies (`/frequencies`)
- **Active Tab**: All public frequencies with participants
- **Private Tab**: Private frequencies with countdown timers
- View participants for each frequency
- Frequency details modal

## File Structure

```
src/
├── components/       # Reusable components
├── context/         # Auth context
├── hooks/           # Custom hooks (countdown timer)
├── layouts/         # Dashboard layout
├── pages/           # Login, Dashboard, Users, Frequencies
├── services/        # API calls (auth, users, frequencies)
└── utils/           # Helper functions (formatters)
```

## Key Technologies

- **React 19** + **React Router DOM**
- **Ant Design** (UI Components + Icons)
- **Tailwind CSS v4**
- **Recharts** (Charts)
- **Axios** (API calls)
- **Day.js** (Date handling)

## Common Tasks

### Run Dev Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Run Linter
```bash
npm run lint
```

## API Configuration

Update `.env` if backend URL changes:
```
VITE_API_URL=http://your-backend-url/api
```

## Troubleshooting

### Port Already in Use
Vite will automatically try the next available port (5174, 5175, etc.)

### CORS Errors
Add admin dashboard URL to backend CORS whitelist:
```javascript
// In backend
cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175']
})
```

### 401 Unauthorized
1. Check if backend is running
2. Verify login credentials
3. Check JWT token configuration

### Data Not Loading
1. Open browser console (F12)
2. Check Network tab for API calls
3. Verify API endpoints are correct
4. Check backend response format

## Development Tips

### Mock Data for Testing
If backend is not ready, add mock data in service files:

```javascript
// In src/services/userService.js
export const userService = {
  getAllUsers: async () => ({
    users: [/* mock users */],
    total: 10
  })
};
```

### Hot Reload
Vite supports hot module replacement. Changes will reflect instantly.

### State Management
Authentication state is managed via React Context (`AuthContext.jsx`)

## Browser Support

- Chrome (recommended)
- Firefox
- Edge
- Safari

## Responsive Design

- **Desktop**: Full features
- **Tablet**: Collapsible sidebar
- **Mobile**: Optimized layout

## Next Steps

1. ✅ Server is running on http://localhost:5175/
2. 📖 Read `README.md` for complete documentation
3. 🔧 Check `BACKEND_SETUP.md` for API integration
4. 📁 Review `PROJECT_STRUCTURE.md` for architecture details

## Important Files

- `src/App.jsx` - Main routing configuration
- `src/context/AuthContext.jsx` - Authentication logic
- `src/services/api.js` - Axios configuration
- `src/layouts/DashboardLayout.jsx` - Main layout
- `src/pages/Dashboard.jsx` - Dashboard page

## Support

For issues or questions:
1. Check browser console for errors
2. Review `BACKEND_SETUP.md` for API format
3. Verify all dependencies are installed
4. Check `.env` configuration

---

## ✨ Features Checklist

✅ Email/Password Login  
✅ User Management  
✅ Active Frequencies Monitoring  
✅ Private Frequencies with Timers  
✅ Daily Active Users Chart  
✅ User Growth Graph  
✅ Ant Design Icons  
✅ Fully Responsive  
✅ Advanced Folder Structure  
✅ Complete Authentication  

---

**You're all set! Open http://localhost:5175/ to access the admin dashboard.**
