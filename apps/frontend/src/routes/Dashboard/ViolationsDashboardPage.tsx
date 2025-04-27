import { List } from './List';
import CustomBarChart from '@/UI/Elements/Charts/BarChart/BarChart';
import CustomPieChart from '@/UI/Elements/Charts/PieChart/PieChart';
import { CustomCard } from '@/UI/Elements/Dashboard/Card';
import ChartCard from '@/UI/Elements/Dashboard/ChartCard';
import { CustomTabsCard } from '@/UI/Elements/Dashboard/TabsCard';
import { Card, Flex } from '@radix-ui/themes';

function ViolationsDashboardPage({ trafficData }: any) {
  return (
    <Flex
      direction={{ initial: 'column', sm: 'row' }}
      wrap={'wrap'}
    >
      <Flex
        direction="column"
        maxWidth={{ initial: '100%', md: '260px' }}
        width="100%"
        minWidth="260px"
        className="left-section"
      >
        <CustomCard
          label="Violations"
          value="4"
        />

        <CustomTabsCard
          sections={[
            {
              id: 'violations-vt',
              label: 'Violations by vehicle type',
              topLabel: 'Vehicle Type',
              children: <CustomPieChart propsData={trafficData} />,
            },
            {
              id: 'violations-st',
              label: 'Violations by severity',
              topLabel: 'Severity',
              children: <CustomPieChart propsData={trafficData} />,
            },
          ]}
        />
      </Flex>
      <Flex
        direction="column"
        className="middle-section"
        maxWidth={{ initial: '100%', md: '65vw' }}
        flexGrow={'1'}
      >
        <ChartCard label="Violations by Country">
          <CustomBarChart propsData={trafficData} />
        </ChartCard>
      </Flex>
      <Flex
        direction="column"
        className="right-section"
        flexGrow={'1'}
        minWidth="260px"
        style={{ height: '85vh' }}
      >
        <Card>
          <List
            list={[
              { name: 'Speeding', time: '5/4/2025' },
              { name: 'No Helmet', time: '5/4/2025' },
              { name: 'Illegal Parking', time: '5/4/2025' },
              { name: 'Red Light', time: '5/4/2025' },
              { name: 'Wrong Way Driving', time: '5/4/2025' },
              { name: 'Speeding', time: '5/4/2025' },
              { name: 'No Helmet', time: '5/4/2025' },
              { name: 'Illegal Parking', time: '5/4/2025' },
              { name: 'Red Light', time: '5/4/2025' },
              { name: 'Wrong Way Driving', time: '5/4/2025' },
              { name: 'Speeding', time: '5/4/2025' },
              { name: 'No Helmet', time: '5/4/2025' },
              { name: 'Illegal Parking', time: '5/4/2025' },
              { name: 'Red Light', time: '5/4/2025' },
              { name: 'Wrong Way Driving', time: '5/4/2025' },
              { name: 'Speeding', time: '5/4/2025' },
              { name: 'No Helmet', time: '5/4/2025' },
              { name: 'Illegal Parking', time: '5/4/2025' },
              { name: 'Red Light', time: '5/4/2025' },
              { name: 'Wrong Way Driving', time: '5/4/2025' },
              { name: 'Speeding', time: '5/4/2025' },
              { name: 'No Helmet', time: '5/4/2025' },
              { name: 'Illegal Parking', time: '5/4/2025' },
              { name: 'Red Light', time: '5/4/2025' },
              { name: 'Wrong Way Driving', time: '5/4/2025' },
            ]}
          />
        </Card>
      </Flex>
    </Flex>
  );
}

export default ViolationsDashboardPage;
