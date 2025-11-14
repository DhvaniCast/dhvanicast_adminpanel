# Backend Setup Guide for Admin Dashboard

This guide will help you integrate the admin dashboard with your HarborLeaf Radio backend.

## Required Backend Routes

### 1. Authentication Routes (`/api/auth`)

#### Admin Login
```javascript
// POST /api/auth/admin/login
{
  "email": "admin@example.com",
  "password": "password123"
}

// Response:
{
  "success": true,
  "data": {
    "token": "jwt_token_here",
    "user": {
      "_id": "user_id",
      "name": "Admin Name",
      "email": "admin@example.com",
      "role": "admin"
    }
  }
}
```

#### Get Current User
```javascript
// GET /api/auth/me
// Headers: { Authorization: "Bearer <token>" }

// Response:
{
  "success": true,
  "data": {
    "_id": "user_id",
    "name": "Admin Name",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

### 2. User Routes (`/api/users`)

#### Get All Users (with pagination)
```javascript
// GET /api/users?page=1&limit=10&search=keyword

// Response:
{
  "success": true,
  "data": {
    "users": [
      {
        "_id": "user_id",
        "name": "User Name",
        "email": "user@example.com",
        "phoneNumber": "+1234567890",
        "isOnline": true,
        "role": "user",
        "createdAt": "2024-01-01T00:00:00.000Z",
        "lastActive": "2024-01-01T00:00:00.000Z"
      }
    ],
    "total": 100,
    "page": 1,
    "limit": 10
  }
}
```

#### Get User Stats
```javascript
// GET /api/users/stats

// Response:
{
  "success": true,
  "data": {
    "total": 1000,
    "dailyActive": 150,
    "weeklyActive": 500,
    "monthlyActive": 800
  }
}
```

#### Get Daily Active Users
```javascript
// GET /api/users/daily-active?days=7

// Response:
{
  "success": true,
  "data": [
    { "date": "2024-01-01", "count": 120 },
    { "date": "2024-01-02", "count": 135 },
    { "date": "2024-01-03", "count": 140 }
  ]
}
```

#### Get User Growth
```javascript
// GET /api/users/growth?days=30

// Response:
{
  "success": true,
  "data": [
    { "date": "2024-01-01", "total": 900 },
    { "date": "2024-01-02", "total": 920 },
    { "date": "2024-01-03", "total": 950 }
  ]
}
```

### 3. Frequency Routes (`/api/frequencies`)

#### Get Active Frequencies
```javascript
// GET /api/frequencies/active

// Response:
{
  "success": true,
  "data": [
    {
      "_id": "frequency_id",
      "name": "Frequency Name",
      "type": "public",
      "participantCount": 5,
      "creator": {
        "_id": "user_id",
        "name": "Creator Name"
      },
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### Get Frequency Participants
```javascript
// GET /api/frequencies/:id/participants

// Response:
{
  "success": true,
  "data": [
    {
      "_id": "user_id",
      "name": "User Name",
      "email": "user@example.com",
      "isOnline": true,
      "joinedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### 4. Private Frequency Routes (`/api/private-frequencies`)

#### Get Active Private Frequencies
```javascript
// GET /api/private-frequencies/active

// Response:
{
  "success": true,
  "data": [
    {
      "_id": "frequency_id",
      "name": "Private Frequency",
      "participantCount": 3,
      "duration": 60,
      "expiresAt": "2024-01-01T01:00:00.000Z",
      "creator": {
        "_id": "user_id",
        "name": "Creator Name"
      },
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

## Backend Implementation Example (Express.js)

### Add Admin Login Route

```javascript
// In your authController.js or similar file

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user and check if admin
    const user = await User.findOne({ email, role: 'admin' });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.json({
      success: true,
      data: {
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};
```

### Add User Stats Route

```javascript
const getUserStats = async (req, res) => {
  try {
    const total = await User.countDocuments();
    
    const now = new Date();
    const today = new Date(now.setHours(0, 0, 0, 0));
    const weekAgo = new Date(now.setDate(now.getDate() - 7));
    const monthAgo = new Date(now.setDate(now.getDate() - 30));
    
    const dailyActive = await User.countDocuments({
      lastActive: { $gte: today }
    });
    
    const weeklyActive = await User.countDocuments({
      lastActive: { $gte: weekAgo }
    });
    
    const monthlyActive = await User.countDocuments({
      lastActive: { $gte: monthAgo }
    });
    
    res.json({
      success: true,
      data: {
        total,
        dailyActive,
        weeklyActive,
        monthlyActive
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};
```

### Add Daily Active Users Route

```javascript
const getDailyActiveUsers = async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 7;
    const data = [];
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      
      const nextDay = new Date(date);
      nextDay.setDate(nextDay.getDate() + 1);
      
      const count = await User.countDocuments({
        lastActive: {
          $gte: date,
          $lt: nextDay
        }
      });
      
      data.push({
        date: date.toISOString().split('T')[0],
        count
      });
    }
    
    res.json({
      success: true,
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};
```

## CORS Configuration

Make sure your backend allows requests from the admin dashboard:

```javascript
const cors = require('cors');

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
  credentials: true
}));
```

## Environment Variables

Add to your backend `.env` file:

```
JWT_SECRET=your_secret_key_here
JWT_EXPIRES_IN=7d
ADMIN_EMAIL=admin@harborleaf.com
```

## Testing the Integration

1. Start your backend server
2. Start the admin dashboard (`npm run dev`)
3. Try logging in with admin credentials
4. Check browser console for any API errors
5. Verify data is displaying correctly

## Troubleshooting

### CORS Errors
- Add admin dashboard URL to CORS whitelist
- Check backend CORS configuration

### 401 Unauthorized
- Verify JWT token is being sent in headers
- Check token expiration settings

### Data Not Displaying
- Check API response format matches expected structure
- Verify field names match between backend and frontend
- Check browser console for errors

## Mock Data for Testing

If backend routes are not ready, you can create mock responses in the service files temporarily.

Example:
```javascript
// In userService.js
export const userService = {
  getAllUsers: async (params) => {
    // Mock data for testing
    return {
      users: [
        {
          _id: '1',
          name: 'Test User',
          email: 'test@example.com',
          phoneNumber: '+1234567890',
          isOnline: true,
          role: 'user',
          createdAt: new Date().toISOString()
        }
      ],
      total: 1
    };
  }
};
```

Remove mock data once backend routes are implemented.
