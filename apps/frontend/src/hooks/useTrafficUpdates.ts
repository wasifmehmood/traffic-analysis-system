import env from '../shared/config/env';
import { useEffect, useState } from 'react';

type ITrafficData = {
  name: string;
  main: {
    temp: number;
  };
};

const BACK_OFF = 2000;
const useTrafficUpdates = () => {
  const [trafficData, setTrafficData] = useState<ITrafficData[]>([]);
  const [attempt, setAttempt] = useState<number>(0);
  let eventSource: EventSource;

  const setupEventSource = () => {
    eventSource = new EventSource(`${env.API_URL}/v1/traffic-events/subscribe`);

    eventSource.onopen = () => {
      setAttempt(0);
    };

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('eventSource data:', data);
      setTrafficData((prev) => [...prev, data]);
    };

    eventSource.onerror = (error) => {
      console.error('eventSource error:', error);
      eventSource.close();
      setAttempt(attempt + 1);
    };
  };

  useEffect(() => {
    if (attempt > 3) return;
    setTimeout(() => {
      setupEventSource();
    }, attempt * BACK_OFF);

    return () => {
      eventSource?.close();
    };
  }, [attempt]);

  return { trafficData };
};

export default useTrafficUpdates;
