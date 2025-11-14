import { Card } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

const StatCard = ({ title, value, icon, trend, trendValue, loading = false }) => {
  const trendColor = trend === 'up' ? 'text-green-600' : 'text-red-600';
  const TrendIcon = trend === 'up' ? ArrowUpOutlined : ArrowDownOutlined;

  return (
    <Card loading={loading} className="shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-gray-500 text-sm mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
          {trendValue && (
            <div className={`flex items-center mt-2 ${trendColor}`}>
              <TrendIcon className="mr-1" />
              <span className="text-sm font-medium">{trendValue}</span>
            </div>
          )}
        </div>
        <div className="ml-4 p-3 bg-blue-50 rounded-lg">
          <div className="text-blue-600 text-2xl">{icon}</div>
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
