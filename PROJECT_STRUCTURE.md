# HarborLeaf Radio Admin - Complete Project Structure

```
harborleaf_radio_admin/
├── public/                          # Public assets
│
├── src/
│   ├── components/                  # Reusable UI components
│   │   ├── ProtectedRoute.jsx      # Route guard for authentication
│   │   └── StatCard.jsx            # Dashboard statistics card
│   │
│   ├── context/                     # React Context providers
│   │   └── AuthContext.jsx         # Authentication state management
│   │
│   ├── hooks/                       # Custom React hooks
│   │   └── useCountdown.js         # Countdown timer hook for private frequencies
│   │
│   ├── layouts/                     # Layout components
│   │   └── DashboardLayout.jsx     # Main dashboard layout with sidebar & header
│   │
│   ├── pages/                       # Page components
│   │   ├── Dashboard.jsx           # Main dashboard with stats & charts
│   │   ├── Frequencies.jsx         # Frequency management page
│   │   ├── Login.jsx               # Admin login page
│   │   └── Users.jsx               # User management page
│   │
│   ├── services/                    # API service layer
│   │   ├── api.js                  # Axios instance with interceptors
│   │   ├── authService.js          # Authentication API calls
│   │   ├── frequencyService.js     # Frequency API calls
│   │   └── userService.js          # User API calls
│   │
│   ├── utils/                       # Utility functions
│   │   └── formatters.js           # Date, number, duration formatters
│   │
│   ├── App.css                      # Global app styles
│   ├── App.jsx                      # Main app component with routing
│   ├── index.css                    # Base styles with Tailwind
│   └── main.jsx                     # App entry point
│
├── .env                             # Environment variables
├── .env.example                     # Example env file
├── .gitignore                       # Git ignore rules
├── BACKEND_SETUP.md                 # Backend integration guide
├── eslint.config.js                 # ESLint configuration
├── index.html                       # HTML entry point
├── package.json                     # Dependencies & scripts
├── postcss.config.js                # PostCSS configuration
├── README.md                        # Complete documentation
└── vite.config.js                   # Vite configuration

```

## Component Breakdown

### Pages (src/pages/)

#### 1. Login.jsx
- Email/password form
- Form validation
- Authentication handling
- Responsive design

#### 2. Dashboard.jsx
- 4 statistics cards (Total Users, Active Frequencies, Private Frequencies, Daily Active)
- Active frequencies table
- Private frequencies table with countdown timers
- Daily active users bar chart (7 days)
- User growth line chart (30 days)

#### 3. Users.jsx
- User list table with pagination
- Search functionality
- User status indicators (online/offline)
- User details modal
- Delete user functionality

#### 4. Frequencies.jsx
- Tabbed interface (Active/Private)
- Active frequencies table
- Private frequencies with countdown timers
- Frequency details modal
- Participant list for each frequency

### Components (src/components/)

#### 1. ProtectedRoute.jsx
- Authentication check
- Loading state
- Automatic redirect to login

#### 2. StatCard.jsx
- Reusable statistics card
- Icon support
- Trend indicators (up/down)
- Responsive design

### Layouts (src/layouts/)

#### 1. DashboardLayout.jsx
- Collapsible sidebar
- Top header with user info
- Logout functionality
- Responsive navigation
- Outlet for nested routes

### Services (src/services/)

#### 1. api.js
- Axios instance configuration
- Request interceptor (adds JWT token)
- Response interceptor (handles errors)
- Base URL configuration

#### 2. authService.js
- Admin login
- Get current user
- Logout

#### 3. userService.js
- Get all users (paginated)
- Get user by ID
- Get user statistics
- Get daily active users
- Get user growth data
- Update user
- Delete user

#### 4. frequencyService.js
- Get active frequencies
- Get private frequencies
- Get frequency details
- Get frequency participants
- Get frequency statistics

### Context (src/context/)

#### 1. AuthContext.jsx
- User state management
- Token management
- Login/logout functions
- Authentication status

### Hooks (src/hooks/)

#### 1. useCountdown.js
- Real-time countdown timer
- Returns hours, minutes, seconds
- Expired state tracking

### Utils (src/utils/)

#### 1. formatters.js
- formatDate()
- formatDateTime()
- formatRelativeTime()
- formatDuration()
- formatNumber()
- formatPercentage()

## Key Features

### 🔐 Authentication
- JWT token-based auth
- Protected routes
- Auto-redirect on 401
- Persistent login

### 📊 Dashboard
- Real-time statistics
- Interactive charts
- Live data updates
- Countdown timers

### 👥 User Management
- Search & filter
- Pagination
- User details view
- Status tracking

### 📡 Frequency Management
- Active/Private tabs
- Participant tracking
- Time-based expiry
- Detailed views

### 🎨 UI/UX
- Ant Design components
- Tailwind CSS styling
- Responsive design
- Professional icons
- Smooth animations

## Tech Stack

- **React 19** - UI Library
- **React Router DOM** - Routing
- **Ant Design** - UI Components
- **@ant-design/icons** - Icons
- **Tailwind CSS v4** - Styling
- **Axios** - HTTP Client
- **Recharts** - Charts
- **Day.js** - Date handling
- **Vite** - Build tool

## Development Workflow

1. **Start Backend**: Ensure backend is running on port 5000
2. **Configure .env**: Set VITE_API_URL
3. **Install Dependencies**: `npm install`
4. **Start Dev Server**: `npm run dev`
5. **Access Dashboard**: http://localhost:5173/login

## Build for Production

```bash
npm run build
```

Output: `dist/` folder ready for deployment

## API Integration Checklist

- [ ] Backend running on configured URL
- [ ] CORS enabled for admin dashboard
- [ ] Admin login route implemented
- [ ] User stats routes available
- [ ] Frequency routes available
- [ ] JWT authentication working
- [ ] Response format matches expected structure

## Responsive Design

- **Desktop**: Full sidebar, all features visible
- **Tablet**: Collapsible sidebar, optimized tables
- **Mobile**: Hamburger menu, stacked layouts

## Color Scheme

- **Primary**: #1890ff (Blue)
- **Success**: #52c41a (Green)
- **Warning**: #faad14 (Orange)
- **Error**: #ff4d4f (Red)
- **Background**: #f0f2f5 (Light Gray)
- **Text**: #000000 (Black) / #ffffff (White)

## Future Enhancements

- [ ] Real-time updates with WebSocket
- [ ] Export data to CSV/Excel
- [ ] Advanced filtering options
- [ ] User activity logs
- [ ] System settings page
- [ ] Email notifications
- [ ] Role-based permissions
- [ ] Dark mode support
