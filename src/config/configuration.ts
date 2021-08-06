import { IConfig } from './config.interfaces';

export default (): IConfig => ({
  serverPort: Number(process.env.PORT),
  apiKey: process.env.API_KEY,
});
