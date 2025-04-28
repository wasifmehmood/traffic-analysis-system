import { Text } from '@/UI/Elements/Text';
import { Box, Card, Tabs } from '@radix-ui/themes';
import { JSX, memo } from 'react';

const CustomTabsCharts = memo(({
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
    <Card style={{ height: '85vh' }}>
      <Tabs.Root defaultValue="violations-by-country">
        <Tabs.List>
          {sections
            ? sections.map(({ id, topLabel }) => (
                <Tabs.Trigger
                  key={id}
                  value={id}
                >
                  {topLabel}
                </Tabs.Trigger>
              ))
            : null}
        </Tabs.List>

        <Box pt="3">
          {sections
            ? sections.map(({ id, label, children }) => (
                <Tabs.Content
                  key={id}
                  value={id}
                  style={{ height: '73vh' }}
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
        </Box>
      </Tabs.Root>
    </Card>
  );
});

export { CustomTabsCharts };
