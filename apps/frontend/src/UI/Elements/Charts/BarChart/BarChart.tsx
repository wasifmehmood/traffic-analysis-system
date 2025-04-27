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

const data = [
  { country: 'USA', volume: 400 },
  { country: 'Canada', volume: 300 },
  { country: 'Germany', volume: 200 },
  { country: 'UK', volume: 278 },
  { country: 'Australia', volume: 189 },
  { country: 'France', volume: 239 },
  { country: 'Italy', volume: 349 },
];

const CustomBarChart = () => {
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
        <XAxis dataKey="volume" /> {/* X-Axis shows the country */}
        <YAxis dataKey={'country'} type='category'/> {/* Y-Axis shows the count of users */}
        <Tooltip />
        <Legend />
        <Bar
          dataKey="volume"
          fill="#8884d8"
        />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

export default CustomBarChart;
