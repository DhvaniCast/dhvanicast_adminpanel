import api from './api';

export const frequencyService = {
  getActiveFrequencies: async () => {
    return await api.get('/frequencies/active');
  },

  getFrequencyById: async (id) => {
    return await api.get(`/frequencies/${id}`);
  },

  getFrequencyParticipants: async (id) => {
    return await api.get(`/frequencies/${id}/participants`);
  },

  getPrivateFrequencies: async () => {
    return await api.get('/private-frequencies/admin/active');
  },

  getPrivateFrequencyById: async (id) => {
    return await api.get(`/private-frequencies/${id}`);
  },

  getFrequencyStats: async () => {
    return await api.get('/frequencies/stats');
  },
};
