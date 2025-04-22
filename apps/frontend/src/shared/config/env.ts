import { version } from '../../../package.json';

const env = {
  VERSION: version,
  NODE_ENV: import.meta.env.MODE,
  IS_DEV: import.meta.env.MODE === 'development',
  APP_NAME: 'traffic-analysis',
  API_URL: import.meta.env.VITE_API_URL,
};

export default env;
