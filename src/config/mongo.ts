import { ConfigService } from '@nestjs/config';
import { TypegooseModuleOptions } from 'nestjs-typegoose';

export const mongoConfig = async (
  configService: ConfigService,
): Promise<TypegooseModuleOptions> => {
  return {
    uri: getMongo(configService),
    ...mongoOptions(),
  };
};

const getMongo = (configService: ConfigService) =>
  'mongodb://' +
  configService.get('DB_LOGIN') +
  ':' +
  configService.get('DB_PASSWORD') +
  '@' +
  configService.get('DB_HOST') +
  ':' +
  configService.get('DB_PORT') +
  '/' +
  configService.get('DB_AUTH');

const mongoOptions = () => ({
  useUnifiedTopology: true,
});
