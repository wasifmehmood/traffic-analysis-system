import env from '../shared/config/env';
import { useEffect, useState } from 'react';

type ViotionsType =
  | 'Speeding'
  | 'Red Light'
  | 'Illegal Parking'
  | 'No Helmet'
  | 'Wrong Way Driving';

export type TrafficViolations = Array<{
  id: number;
  created_at: Date;
  violation: {
    name: ViotionsType;
  };
}>;

export type VehicleTypesViolations = Array<{
  id: number;
  name: string;
  violations: number;
}>;

export type TrafficViolationsByCountry = Array<{
  id: number;
  name: string;
  violations: number;
}>;

export type SpeedViolationsInLastHour = Array<{
  avg_speed_kph: string;
  created_at: Date;
}>;

type ITrafficData = {
  violationsByVehicleType: VehicleTypesViolations;
  trafficViolationByCountry: TrafficViolationsByCountry;
  recentTrafficViolations: TrafficViolations;
  speedViolationsInLastHour: SpeedViolationsInLastHour;
  violationsCount: number;
};

const BACK_OFF = 2000;
const useTrafficUpdates = () => {
  const [violationCount, setViolationCount] = useState<number>(0);
  const [violationByCountry, setViolationByCountry] =
    useState<TrafficViolationsByCountry>([]);
  const [violationsByVehicleType, setViolationsByVehicleType] =
    useState<VehicleTypesViolations>([]);
  const [recentTrafficViolations, setRecentTrafficViolations] =
    useState<TrafficViolations>([]);
  const [speedViolationsInLastHour, setSpeedViolationsInLastHour] =
    useState<SpeedViolationsInLastHour>([]);
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
      setViolationCount(data.violationsCount);
      setViolationByCountry(data.trafficViolationByCountry);
      setViolationsByVehicleType(data.violationsByVehicleType);
      setRecentTrafficViolations(data.recentTrafficViolations);
      setSpeedViolationsInLastHour(data.speedViolationsInLastHour);
      //   setTrafficData((prev) => [...prev, data]);
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

  useEffect(() => {
    const api = async () => {
      const response = await fetch(`${env.API_URL}/v1/analytics`);
      const { data }: { data: ITrafficData; success: boolean } =
        await response.json();
      setViolationCount(data.violationsCount);
      setViolationByCountry(data.trafficViolationByCountry);
      setViolationsByVehicleType(data.violationsByVehicleType);
      setRecentTrafficViolations(data.recentTrafficViolations);
      setSpeedViolationsInLastHour(data.speedViolationsInLastHour);
    };
    api();
  }, []);

  return {
    violationCount,
    violationByCountry,
    violationsByVehicleType,
    recentTrafficViolations,
    speedViolationsInLastHour,
  };
};

export default useTrafficUpdates;
