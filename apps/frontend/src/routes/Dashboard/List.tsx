import { Text } from '@/UI/Elements/Text';
import { Box, Flex, Heading, ScrollArea } from '@radix-ui/themes';

export const List = ({ list }) => {
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
          {list.map(({ name, time }) => (
            <>
              <Heading
                size="3"
                trim="start"
              >
                {name}
              </Heading>
              <Text
                as="p"
                ml={'2'}
                size={'2'}
                mb={'2'}
              >
                Happened {time}
              </Text>
            </>
          ))}
        </Flex>
      </Box>
    </ScrollArea>
  );
};
