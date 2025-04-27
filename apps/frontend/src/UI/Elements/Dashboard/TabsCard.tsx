import { Text } from '@/UI/Elements/Text';
import { Box, Card, Tabs } from '@radix-ui/themes';
import { JSX } from 'react';
import CustomPieChart from '@/UI/Elements/Charts/PieChart/PieChart';

const CustomTabsCard = ({
  sections,
}: {
  sections: Array<{
    id: string;
    label: string;
    topLabel: string;
    children: JSX.Element;
  }>;
}) => {
  return (
    <Card style={{ height: '350px' }}>
      <Tabs.Root defaultValue="violations-vt">
        <Tabs.List>
          {sections
            ? sections.map(({ id, topLabel }) => (
                <Tabs.Trigger value={id}>{topLabel}</Tabs.Trigger>
              ))
            : null}
          {/* <Tabs.Trigger value="violations-vt">Vehicle Type</Tabs.Trigger>
          <Tabs.Trigger value="violations-st">Severity</Tabs.Trigger> */}
        </Tabs.List>

        <Box pt="3">
          {sections
            ? sections.map(({ id, label, children }) => (
                <Tabs.Content
                  value={id}
                  style={{ height: '250px' }}
                >
                  <Text
                    as="div"
                    size="2"
                    weight="bold"
                  >
                    {label}
                  </Text>
                  {children}
                </Tabs.Content>
              ))
            : null}
          {/* <Tabs.Content
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
          </Tabs.Content> */}
        </Box>
      </Tabs.Root>
    </Card>
  );
};

export { CustomTabsCard };
