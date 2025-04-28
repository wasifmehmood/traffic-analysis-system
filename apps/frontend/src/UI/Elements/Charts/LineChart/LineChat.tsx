import { SpeedViolationsInLastHour } from '@/hooks/useTrafficUpdates';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const CustomLineChart = ({ data }: { data: SpeedViolationsInLastHour }) => {
  const formattedData = data.map((item) => ({
    ...item,
    created_at: new Date(item.created_at).toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }),
  }));
  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
    >
      <LineChart
        width={500}
        height={300}
        data={formattedData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="created_at" />
        <YAxis dataKey={'avg_speed_kph'} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="avg_speed_kph"
          label="Average Speed (kph)"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CustomLineChart;
