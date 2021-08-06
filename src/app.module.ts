import { AppConfigModule } from './config/config.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CurrencyModule } from './modules/currency/currency.module';
import configuration from 'src/config/configuration';

@Module({
  imports: [
    CurrencyModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    AppConfigModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
