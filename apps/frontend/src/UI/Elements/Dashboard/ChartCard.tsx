import { Text } from '@/UI/Elements/Text';
import { Card } from '@radix-ui/themes';

const ChartCard = ({ label, children }: any = {}) => {
  return (
    <Card style={{ height: '85vh' }}>
      <Text
        as="div"
        size="2"
        weight="bold"
      >
        {label}
      </Text>
      {children}
    </Card>
  );
};

export default ChartCard;
