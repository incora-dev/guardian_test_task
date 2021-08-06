import {
  HttpService,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { API_BASE_URL } from '../shared/constants';
import { CurrencyResponse, EstimateResponse } from './types';
import { AppConfigService } from 'src/config/config.service';
import { Token } from './types/enums';

@Injectable()
export class CurrencyService {
  constructor(
    private httpService: HttpService,
    private config: AppConfigService,
  ) {}

  async getCurrencyHandler(token?: Token): Promise<CurrencyResponse> {
    try {
      if (!token) {
        return;
      }

      const {
        data: { value, from_currency },
      } = await this.httpService
        .get<EstimateResponse>(
          `${API_BASE_URL}/estimate?from_currency=EUR&from_amount=1&to_currency=${token}`,
          {
            headers: {
              'x-api-key': this.config.apiKey,
            },
          },
        )
        .toPromise();

      return {
        value,
        tokenName: from_currency,
      };
    } catch (err) {
      throw new ServiceUnavailableException(err.message);
    }
  }
}
