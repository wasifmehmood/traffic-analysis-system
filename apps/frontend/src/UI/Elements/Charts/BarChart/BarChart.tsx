import { TrafficViolationsByCountry } from '@/hooks/useTrafficUpdates';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const CustomBarChart = ({ data }: { data: TrafficViolationsByCountry }) => {
  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
    >
      <RechartsBarChart
        layout="vertical"
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis allowDataOverflow={false} />
        <YAxis
          dataKey={'name'}
          type="category"
        />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="violations"
          fill="#8884d8"
        />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

export default CustomBarChart;
