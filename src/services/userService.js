import api from './api';

export const userService = {
  getAllUsers: async (params) => {
    return await api.get('/users', { params });
  },

  getUserById: async (id) => {
    return await api.get(`/users/${id}`);
  },

  getUserStats: async () => {
    return await api.get('/users/stats/overview');
  },

  getDailyActiveUsers: async (days = 30) => {
    return await api.get('/users/analytics/daily-active', { params: { days } });
  },

  getUserGrowth: async (days = 30) => {
    return await api.get('/users/analytics/growth', { params: { days } });
  },

  updateUser: async (id, data) => {
    return await api.put(`/users/${id}`, data);
  },

  deleteUser: async (id) => {
    return await api.delete(`/users/${id}`);
  },
};
