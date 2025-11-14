import { useEffect, useState } from 'react';
import { Card, Table, Tag, Tabs, Button, Modal, Space, message } from 'antd';
import { TeamOutlined, EyeOutlined, RadarChartOutlined } from '@ant-design/icons';
import { frequencyService } from '../services/frequencyService';
import { formatDateTime } from '../utils/formatters';
import { useCountdown } from '../hooks/useCountdown';

const Frequencies = () => {
  const [loading, setLoading] = useState(false);
  const [activeFrequencies, setActiveFrequencies] = useState([]);
  const [privateFrequencies, setPrivateFrequencies] = useState([]);
  const [selectedFrequency, setSelectedFrequency] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [detailsVisible, setDetailsVisible] = useState(false);

  useEffect(() => {
    fetchFrequencies();
  }, []);

  const fetchFrequencies = async () => {
    setLoading(true);
    try {
      console.log('🎯 Fetching frequencies...');
      const [activeResponse, privateResponse] = await Promise.all([
        frequencyService.getActiveFrequencies(),
        frequencyService.getPrivateFrequencies(),
      ]);
      
      console.log('📦 Active frequencies response:', activeResponse);
      console.log('📦 Private frequencies response:', privateResponse);
      
      // Handle response - check if data is wrapped
      const activeData = activeResponse?.data || activeResponse;
      const privateData = privateResponse?.data || privateResponse;
      
      console.log('✅ Extracted active:', Array.isArray(activeData) ? activeData.length : typeof activeData);
      console.log('✅ Extracted private:', Array.isArray(privateData) ? privateData.length : typeof privateData);
      
      setActiveFrequencies(Array.isArray(activeData) ? activeData : []);
      setPrivateFrequencies(Array.isArray(privateData) ? privateData : []);
    } catch (error) {
      console.error('❌ Failed to fetch frequencies:', error);
      message.error('Failed to fetch frequencies');
      setActiveFrequencies([]);
      setPrivateFrequencies([]);
    } finally {
      setLoading(false);
    }
  };

  const showFrequencyDetails = async (frequency) => {
    try {
      console.log('📡 Fetching participants for frequency:', frequency._id);
      const response = await frequencyService.getFrequencyParticipants(frequency._id);
      const participantData = response?.data || response;
      console.log('📦 Participants response:', participantData);
      
      setSelectedFrequency(frequency);
      setParticipants(Array.isArray(participantData) ? participantData : []);
      setDetailsVisible(true);
    } catch (error) {
      console.error('❌ Failed to fetch frequency details:', error);
      message.error('Failed to fetch frequency details');
    }
  };

  const PrivateFrequencyTimer = ({ expiresAt }) => {
    const timeLeft = useCountdown(expiresAt);
    
    if (timeLeft.expired) {
      return <Tag color="red">Expired</Tag>;
    }

    return (
      <Tag color="green">
        {String(timeLeft.hours).padStart(2, '0')}:
        {String(timeLeft.minutes).padStart(2, '0')}:
        {String(timeLeft.seconds).padStart(2, '0')}
      </Tag>
    );
  };

  const activeFrequencyColumns = [
    {
      title: 'Frequency Name',
      dataIndex: 'name',
      key: 'name',
      render: (name) => (
        <div className="flex items-center gap-2">
          <RadarChartOutlined className="text-blue-500" />
          <span className="font-medium">{name}</span>
        </div>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => (
        <Tag color={type === 'public' ? 'blue' : 'purple'}>
          {type?.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Participants',
      dataIndex: 'participantCount',
      key: 'participantCount',
      render: (count) => (
        <Tag color="cyan">
          <TeamOutlined /> {count || 0}
        </Tag>
      ),
    },
    {
      title: 'Created By',
      dataIndex: 'creator',
      key: 'creator',
      render: (creator) => creator?.name || 'System',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => formatDateTime(date),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button
          type="link"
          icon={<EyeOutlined />}
          onClick={() => showFrequencyDetails(record)}
        >
          View Details
        </Button>
      ),
    },
  ];

  const privateFrequencyColumns = [
    {
      title: 'Frequency Name',
      dataIndex: 'name',
      key: 'name',
      render: (name) => (
        <div className="flex items-center gap-2">
          <RadarChartOutlined className="text-purple-500" />
          <span className="font-medium">{name}</span>
        </div>
      ),
    },
    {
      title: 'Participants',
      dataIndex: 'participantCount',
      key: 'participantCount',
      render: (count) => (
        <Tag color="purple">
          <TeamOutlined /> {count || 0}
        </Tag>
      ),
    },
    {
      title: 'Time Left',
      dataIndex: 'expiresAt',
      key: 'expiresAt',
      render: (expiresAt) => <PrivateFrequencyTimer expiresAt={expiresAt} />,
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      render: (duration) => `${duration} minutes`,
    },
    {
      title: 'Created By',
      dataIndex: 'creator',
      key: 'creator',
      render: (creator) => creator?.name || 'Unknown',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => formatDateTime(date),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button
          type="link"
          icon={<EyeOutlined />}
          onClick={() => showFrequencyDetails(record)}
        >
          View Details
        </Button>
      ),
    },
  ];

  const participantColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name) => name || 'Anonymous',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Status',
      dataIndex: 'isOnline',
      key: 'isOnline',
      render: (isOnline) => (
        <Tag color={isOnline ? 'green' : 'default'}>
          {isOnline ? 'Active' : 'Inactive'}
        </Tag>
      ),
    },
    {
      title: 'Joined At',
      dataIndex: 'joinedAt',
      key: 'joinedAt',
      render: (date) => formatDateTime(date),
    },
  ];

  const tabItems = [
    {
      key: 'active',
      label: `Active Frequencies (${activeFrequencies.length})`,
      children: (
        <Table
          dataSource={activeFrequencies}
          columns={activeFrequencyColumns}
          rowKey="_id"
          loading={loading}
          scroll={{ x: 1000 }}
        />
      ),
    },
    {
      key: 'private',
      label: `Private Frequencies (${privateFrequencies.length})`,
      children: (
        <Table
          dataSource={privateFrequencies}
          columns={privateFrequencyColumns}
          rowKey="_id"
          loading={loading}
          scroll={{ x: 1200 }}
        />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Frequency Management</h1>
      </div>

      <Card className="shadow-sm">
        <Tabs items={tabItems} />
      </Card>

      <Modal
        title={`Frequency Details: ${selectedFrequency?.name}`}
        open={detailsVisible}
        onCancel={() => setDetailsVisible(false)}
        footer={null}
        width={800}
      >
        {selectedFrequency && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 pb-4 border-b">
              <div>
                <p className="text-gray-500 text-sm">Frequency ID</p>
                <p className="font-medium">{selectedFrequency._id}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Type</p>
                <Tag color={selectedFrequency.type === 'public' ? 'blue' : 'purple'}>
                  {selectedFrequency.type?.toUpperCase()}
                </Tag>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Created By</p>
                <p className="font-medium">{selectedFrequency.creator?.name || 'System'}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Created At</p>
                <p className="font-medium">{formatDateTime(selectedFrequency.createdAt)}</p>
              </div>
              {selectedFrequency.expiresAt && (
                <div>
                  <p className="text-gray-500 text-sm">Time Left</p>
                  <PrivateFrequencyTimer expiresAt={selectedFrequency.expiresAt} />
                </div>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">
                Participants ({participants.length})
              </h3>
              <Table
                dataSource={participants}
                columns={participantColumns}
                rowKey="_id"
                pagination={{ pageSize: 5 }}
                scroll={{ x: 600 }}
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Frequencies;
