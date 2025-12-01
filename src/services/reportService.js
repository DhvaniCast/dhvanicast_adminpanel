import api from './api';

// Get all reports with optional filters
export const getReports = async (params = {}) => {
  console.log('📡 [SERVICE] getReports called with params:', params);
  const queryString = new URLSearchParams(params).toString();
  const response = await api.get(`/social/reports?${queryString}`);
  console.log('📥 [SERVICE] getReports response:', response);
  console.log('📥 [SERVICE] response.data:', response.data);
  return response;
};

// Get report statistics
export const getReportStats = async () => {
  console.log('📊 [SERVICE] getReportStats called');
  const response = await api.get('/social/reports/stats');
  console.log('📊 [SERVICE] getReportStats response:', response);
  return response;
};

// Update report status
export const updateReportStatus = async (reportId, data) => {
  const response = await api.put(`/social/reports/${reportId}`, data);
  return response.data;
};

// Delete report
export const deleteReport = async (reportId) => {
  const response = await api.delete(`/social/reports/${reportId}`);
  return response.data;
};

export default {
  getReports,
  getReportStats,
  updateReportStatus,
  deleteReport,
};
