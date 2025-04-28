import { List } from './List';
import CustomBarChart from '@/UI/Elements/Charts/BarChart/BarChart';
import CustomLineChart from '@/UI/Elements/Charts/LineChart/LineChat';
import CustomPieChart from '@/UI/Elements/Charts/PieChart/PieChart';
import { CustomCard } from '@/UI/Elements/Dashboard/Card';
import { CustomTabsCard } from '@/UI/Elements/Dashboard/TabsCard';
import { CustomTabsCharts } from '@/UI/Elements/Dashboard/TabsChart';
import {
  TrafficViolations,
  TrafficViolationsByCountry,
  SpeedViolationsInLastHour,
  VehicleTypesViolations,
} from '@/hooks/useTrafficUpdates';
import { Card, Flex } from '@radix-ui/themes';
import { memo } from 'react';

function ViolationsDashboardPage({
  violationCount,
  violationByCountry,
  violationsByVehicleType,
  recentTrafficViolations,
  speedViolationsInLastHour,
}: {
  violationCount: number;
  violationByCountry: TrafficViolationsByCountry;
  violationsByVehicleType: VehicleTypesViolations;
  recentTrafficViolations: TrafficViolations;
  speedViolationsInLastHour: SpeedViolationsInLastHour;
}) {
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
          value={violationCount}
        />

        <CustomTabsCard
          sections={[
            {
              id: 'violations-vt',
              label: 'Violations by Vehicle Type',
              topLabel: 'Vehicle Type',
              children: <CustomPieChart props={violationsByVehicleType} />,
            },
          ]}
        />
      </Flex>
      <Flex
        direction="column"
        className="middle-section"
        maxWidth={{ initial: '100%', md: '60vw' }}
        flexGrow={'1'}
      >
        <CustomTabsCharts
          sections={[
            {
              id: 'violations-by-country',
              label: 'Violations by Country',
              topLabel: 'Country',
              children: <CustomBarChart data={violationByCountry} />,
            },
            {
              id: 'violations-by-vehicle-type',
              label: 'Average Speed Violations',
              topLabel: 'Speed Violations (Last Hour)',
              children: <CustomLineChart data={speedViolationsInLastHour} />,
            },
          ]}
        ></CustomTabsCharts>
      </Flex>
      <Flex
        direction="column"
        className="right-section"
        flexGrow={'1'}
        minWidth="260px"
        style={{ height: '85vh' }}
      >
        <Card>
          <List list={recentTrafficViolations} />
        </Card>
      </Flex>
    </Flex>
  );
}

export default memo(ViolationsDashboardPage);
