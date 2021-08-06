import { CurrencyService } from './currency.service';
import { Controller, Get, Query, Render } from '@nestjs/common';
import { FindCurrencyQueryDto } from './dtos/get-currency.dto';
import { CurrencyResponse } from './types';

@Controller('currency')
export class CurrencyController {
  constructor(private service: CurrencyService) {}

  @Render('index')
  @Get()
  async getCurrencyPage(
    @Query() { token }: FindCurrencyQueryDto,
  ): Promise<CurrencyResponse> {
    return await this.service.getCurrencyHandler(token);
  }
}
