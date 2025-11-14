# HarborLeaf Radio - Admin Dashboard

Professional admin dashboard for managing HarborLeaf Radio platform with a modern, responsive UI.

## 🚀 Features

### Authentication
- Secure login with email and password
- JWT token-based authentication
- Protected routes with automatic redirect
- Session management

### Dashboard Overview
- **Statistics Cards**: Total users, active frequencies, private frequencies, daily active users
- **Active Frequencies Table**: Real-time monitoring of all active frequencies with participant counts
- **Private Frequencies Table**: Live countdown timers showing time remaining for private frequencies
- **Daily Active Users Chart**: Bar chart showing user activity over the last 7 days
- **User Growth Graph**: Line chart displaying user growth trends over 30 days

### User Management
- Complete user list with search functionality
- User details modal with comprehensive information
- Online/offline status indicators
- User role management
- Pagination and sorting

### Frequency Management
- Separate tabs for active and private frequencies
- Real-time participant monitoring
- Frequency details with participant list
- Live countdown timers for private frequencies
- Frequency type indicators

## 🎨 UI/UX Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Ant Design Icons**: Professional icons throughout the interface
- **Modern Theme**: Clean, professional design matching the app theme
- **Real-time Updates**: Live countdown timers and status indicators
- **Interactive Charts**: Beautiful visualizations using Recharts
- **Smooth Animations**: Polished transitions and hover effects

## 📁 Folder Structure

```
harborleaf_radio_admin/
├── src/
│   ├── components/          # Reusable components
│   │   ├── ProtectedRoute.jsx
│   │   └── StatCard.jsx
│   ├── context/            # React context providers
│   │   └── AuthContext.jsx
│   ├── hooks/              # Custom React hooks
│   │   └── useCountdown.js
│   ├── layouts/            # Layout components
│   │   └── DashboardLayout.jsx
│   ├── pages/              # Page components
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   ├── Users.jsx
│   │   └── Frequencies.jsx
│   ├── services/           # API services
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── userService.js
│   │   └── frequencyService.js
│   ├── utils/              # Utility functions
│   │   └── formatters.js
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── .env
├── .env.example
├── package.json
└── README.md
```

## 🛠️ Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` and update the API URL:
```
VITE_API_URL=http://localhost:5000/api
```

3. Start the development server:
```bash
npm run dev
```

## 📦 Technologies Used

- **React 19** - UI library
- **React Router DOM** - Routing
- **Ant Design** - UI components and icons
- **Tailwind CSS v4** - Styling
- **Axios** - HTTP client
- **Recharts** - Charts and visualizations
- **Day.js** - Date formatting and manipulation
- **Vite** - Build tool

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔐 Authentication

The admin dashboard uses JWT token-based authentication:

1. Login with admin credentials
2. Token is stored in localStorage
3. Token is automatically attached to API requests
4. Protected routes check authentication status
5. Automatic logout on token expiration

## 📊 API Integration

All API calls are managed through service files:

- **authService.js** - Authentication endpoints
- **userService.js** - User management endpoints
- **frequencyService.js** - Frequency management endpoints

The Axios instance is configured with:
- Base URL from environment variables
- Request interceptor for JWT token
- Response interceptor for error handling
- Automatic 401 redirect to login

## 🎯 Key Features Implemented

✅ Login page with email/password  
✅ User details management  
✅ Currently active frequencies monitoring  
✅ Participant tracking for each frequency  
✅ Private frequency monitoring with countdown timers  
✅ Daily active users bar chart  
✅ Users growth line graph  
✅ Ant Design icons throughout  
✅ Fully responsive design  
✅ Advanced folder structure  
✅ Complete authentication flow  

## 🌐 Backend Integration

Ensure your backend API supports the following endpoints:

### Auth
- POST `/api/auth/admin/login` - Admin login
- GET `/api/auth/me` - Get current user
- POST `/api/auth/logout` - Logout

### Users
- GET `/api/users` - Get all users (with pagination)
- GET `/api/users/:id` - Get user by ID
- GET `/api/users/stats` - Get user statistics
- GET `/api/users/daily-active` - Get daily active users
- GET `/api/users/growth` - Get user growth data
- PUT `/api/users/:id` - Update user
- DELETE `/api/users/:id` - Delete user

### Frequencies
- GET `/api/frequencies/active` - Get active frequencies
- GET `/api/frequencies/:id` - Get frequency by ID
- GET `/api/frequencies/:id/participants` - Get participants
- GET `/api/frequencies/stats` - Get frequency statistics
- GET `/api/private-frequencies/active` - Get active private frequencies
- GET `/api/private-frequencies/:id` - Get private frequency by ID

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

The sidebar automatically collapses on mobile devices for better UX.

## 🎨 Theme Colors

- Primary: Blue (#1890ff)
- Success: Green (#52c41a)
- Warning: Orange (#faad14)
- Error: Red (#ff4d4f)
- Background: Gray (#f0f2f5)

## 🚀 Deployment

Build the production version:
```bash
npm run build
```

The `dist` folder will contain the optimized production build ready for deployment.

## 📄 License

This project is part of the HarborLeaf Radio ecosystem.

