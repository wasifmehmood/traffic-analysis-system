import { Text } from '@/UI/Elements/Text';
import { Box, Card, Tabs } from '@radix-ui/themes';
import { JSX } from 'react';

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
        </Box>
      </Tabs.Root>
    </Card>
  );
};

export { CustomTabsCard };
