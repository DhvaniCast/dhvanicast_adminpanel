import { useEffect, useState } from 'react';
import { Card, Table, Tag, Button, Input, Space, Modal, message } from 'antd';
import { SearchOutlined, EyeOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons';
import { userService } from '../services/userService';
import { formatDateTime, formatNumber } from '../utils/formatters';

const Users = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const [searchText, setSearchText] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [detailsVisible, setDetailsVisible] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [pagination.current, pagination.pageSize, searchText]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      console.log('👥 Fetching users...');
      const response = await userService.getAllUsers({
        page: pagination.current,
        limit: pagination.pageSize,
        search: searchText,
      });
      
      console.log('📦 Users API Response:', response);
      
      // Handle response - check if data is wrapped
      const userData = response?.data || response;
      const usersList = userData?.users || [];
      const total = userData?.total || 0;
      
      console.log('✅ Extracted users:', usersList.length, 'Total:', total);
      
      setUsers(Array.isArray(usersList) ? usersList : []);
      setPagination((prev) => ({ ...prev, total }));
    } catch (error) {
      console.error('❌ Failed to fetch users:', error);
      message.error('Failed to fetch users');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleTableChange = (newPagination) => {
    setPagination(newPagination);
  };

  const handleSearch = (value) => {
    setSearchText(value);
    setPagination((prev) => ({ ...prev, current: 1 }));
  };

  const showUserDetails = async (user) => {
    try {
      console.log('👤 Fetching user details for:', user._id);
      const response = await userService.getUserById(user._id);
      const details = response?.data || response;
      console.log('📦 User details:', details);
      setSelectedUser(details);
      setDetailsVisible(true);
    } catch (error) {
      console.error('❌ Failed to fetch user details:', error);
      message.error('Failed to fetch user details');
    }
  };

  const handleDeleteUser = (userId) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this user?',
      content: 'This action cannot be undone.',
      okText: 'Delete',
      okType: 'danger',
      onOk: async () => {
        try {
          await userService.deleteUser(userId);
          message.success('User deleted successfully');
          fetchUsers();
        } catch (error) {
          message.error('Failed to delete user');
        }
      },
    });
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name, record) => (
        <div className="flex items-center gap-2">
          <UserOutlined className="text-gray-500" />
          <span className="font-medium">{name || 'N/A'}</span>
        </div>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'mobile',
      key: 'mobile',
      render: (phone) => phone || 'N/A',
    },
    {
      title: 'Status',
      dataIndex: 'isOnline',
      key: 'isOnline',
      render: (isOnline) => (
        <Tag color={isOnline ? 'green' : 'default'}>
          {isOnline ? 'Online' : 'Offline'}
        </Tag>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <Tag color={role === 'admin' ? 'red' : 'blue'}>
          {role?.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Joined',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => formatDateTime(date),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => showUserDetails(record)}
          >
            View
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteUser(record._id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
      </div>

      <Card className="shadow-sm">
        <div className="mb-4">
          <Input.Search
            placeholder="Search by name, email, or phone"
            allowClear
            enterButton={<SearchOutlined />}
            size="large"
            onSearch={handleSearch}
            className="max-w-md"
          />
        </div>

        <Table
          dataSource={users}
          columns={columns}
          rowKey="_id"
          loading={loading}
          pagination={pagination}
          onChange={handleTableChange}
          scroll={{ x: 1000 }}
        />
      </Card>

      <Modal
        title="User Details"
        open={detailsVisible}
        onCancel={() => setDetailsVisible(false)}
        footer={null}
        width={600}
      >
        {selectedUser && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500 text-sm">Name</p>
                <p className="font-medium">{selectedUser.name || 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Email</p>
                <p className="font-medium">{selectedUser.email}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Phone</p>
                <p className="font-medium">{selectedUser.mobile || 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Status</p>
                <Tag color={selectedUser.isOnline ? 'green' : 'default'}>
                  {selectedUser.isOnline ? 'Online' : 'Offline'}
                </Tag>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Role</p>
                <Tag color={selectedUser.role === 'admin' ? 'red' : 'blue'}>
                  {selectedUser.role?.toUpperCase()}
                </Tag>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Joined</p>
                <p className="font-medium">{formatDateTime(selectedUser.createdAt)}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Last Active</p>
                <p className="font-medium">
                  {selectedUser.lastActive ? formatDateTime(selectedUser.lastActive) : 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Frequencies</p>
                <p className="font-medium">{selectedUser.frequencyCount || 0}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Users;
