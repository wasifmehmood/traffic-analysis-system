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

const data = [
  { date: '13:15:00', speed: 100 },
  { date: '13:15:00', speed: 80 },
  { date: '13:15:00', speed: 110 },
  { date: '13:15:00', speed: 75 },
  { date: '13:15:00', speed: 85 },
  { date: '13:15:00', speed: 95 },
  { date: '13:15:00', speed: 100 },
];

const CustomLineChart = ({ data }) => {
  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
    >
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="xAxis" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="yAxis"
          label="speed"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CustomLineChart;
