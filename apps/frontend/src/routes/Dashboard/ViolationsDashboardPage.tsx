import { List } from './List';
import CustomBarChart from '@/UI/Elements/Charts/BarChart/BarChart';
import CustomPieChart from '@/UI/Elements/Charts/PieChart/PieChart';
import { Text } from '@/UI/Elements/Text';
import { Box, Card, Flex, Tabs } from '@radix-ui/themes';

function ViolationsDashboardPage({ trafficData }: any) {
  return (
    <Flex direction="row">
      <Flex
        direction="column"
        maxWidth="300px"
        minWidth="260px"
        className="left-section"
      >
        <div>
          <Card>
            <Text
              as="div"
              size="2"
              weight="bold"
            >
              Number of violations
            </Text>
            <Text
              as="div"
              color="gray"
              size="8"
              m={'6'}
            >
              4 Violations
            </Text>
          </Card>
        </div>
        <div>
          <Card style={{ height: '350px' }}>
            <Tabs.Root defaultValue="violations-vt">
              <Tabs.List>
                <Tabs.Trigger value="violations-vt">Vehicle Type</Tabs.Trigger>
                <Tabs.Trigger value="violations-st">Severity</Tabs.Trigger>
              </Tabs.List>

              <Box pt="3">
                <Tabs.Content
                  value="violations-vt"
                  style={{ height: '250px' }}
                >
                  <Text
                    as="div"
                    size="2"
                    weight="bold"
                  >
                    Violations by vehicle type
                  </Text>
                  <CustomPieChart />
                </Tabs.Content>

                <Tabs.Content
                  value="violations-st"
                  style={{ height: '250px' }}
                >
                  <Text
                    as="div"
                    size="2"
                    weight="bold"
                  >
                    Violations by severity
                  </Text>
                  <CustomPieChart />
                </Tabs.Content>
              </Box>
            </Tabs.Root>
          </Card>
        </div>
      </Flex>
      <Flex
        direction="column"
        className="middle-section"
      >
        <div>
          <Card style={{ height: '85vh', width: '65vw' }}>
            <Text
              as="div"
              size="2"
              weight="bold"
            >
              Number of violations
            </Text>
            <CustomBarChart />
          </Card>
        </div>
        <div></div>
      </Flex>
      <Flex
        direction="column"
        className="right-section"
        maxWidth="300px"
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
