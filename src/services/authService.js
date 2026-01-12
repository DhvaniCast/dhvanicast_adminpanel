import api from './api';

export const authService = {
  login: async (email, password) => {
    const response = await api.post('/auth/admin/login', { email, password });
    // Backend returns: { success: true, data: { token, user } }
    // api interceptor returns response.data, so we get { success: true, data: {...} }
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    // Backend returns: { success: true, data: { user } }
    return response.data?.user || response.user || response;
  },

  logout: async () => {
    await api.post('/auth/logout');
  },
};
