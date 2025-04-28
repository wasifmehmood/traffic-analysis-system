import { Text } from '@/UI/Elements/Text';
import { TrafficViolations } from '@/hooks/useTrafficUpdates';
import { Box, Flex, Heading, ScrollArea } from '@radix-ui/themes';
import { memo } from 'react';

type Props = {
  list: TrafficViolations;
};

export const List = memo(({ list }: Props) => {
  return (
    <ScrollArea
      type="always"
      scrollbars="vertical"
    >
      <Box
        p="2"
        pr="8"
      >
        <Heading
          size="4"
          mb="2"
          trim="start"
        >
          Violations
        </Heading>
        <Flex direction="column">
          {list.map(({ id, violation, created_at }) => (
            <div key={id}>
              <Heading
                size="3"
                trim="start"
              >
                {violation.name}
              </Heading>
              <Text
                as="p"
                ml={'2'}
                size={'2'}
                mb={'2'}
              >
                Happened{' '}
                {new Date(created_at).toLocaleString('en-US', {
                  year: '2-digit',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                })}
              </Text>
            </div>
          ))}
        </Flex>
      </Box>
    </ScrollArea>
  );
});
