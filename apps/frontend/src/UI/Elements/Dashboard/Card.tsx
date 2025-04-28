import { Text } from '@/UI/Elements/Text';
import { Card } from '@radix-ui/themes';
import { memo } from 'react';

type Props = {
  label: string;
  value: number;
};

const CustomCard = memo(({ label, value }: Props) => {
  return (
    <Card>
      <Text
        as="div"
        size="2"
        weight="bold"
      >
        Number of {label}
      </Text>
      <Text
        as="div"
        color="gray"
        size="8"
        m={'6'}
      >
        {value} {label}
      </Text>
    </Card>
  );
});

export { CustomCard };
