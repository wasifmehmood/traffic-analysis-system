import env from '../shared/config/env';
import { useEffect, useState } from 'react';

type ITrafficData = {
  name: string;
  main: {
    temp: number;
  };
};
const useTrafficUpdates = () => {
  const [trafficData, setTrafficData] = useState<ITrafficData[]>([]);
    console.log('test')
  useEffect(() => {
    const eventSource = new EventSource(
      `${env.API_URL}/v1/traffic-events/subscribe`,
    );

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('eventSource data:', data);
      setTrafficData((prev) => [...prev, data]);
    };

    eventSource.onerror = (error) => {
      console.error('eventSource error:', error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return { trafficData };
};

export default useTrafficUpdates;
