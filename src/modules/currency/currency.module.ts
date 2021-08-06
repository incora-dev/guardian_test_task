import { AppConfigModule } from './../../config/config.module';
import { HttpModule, Module } from '@nestjs/common';
import { CurrencyController } from './currency.controller';
import { CurrencyService } from './currency.service';

@Module({
  controllers: [CurrencyController],
  providers: [CurrencyService],
  imports: [HttpModule, AppConfigModule],
})
export class CurrencyModule {}
