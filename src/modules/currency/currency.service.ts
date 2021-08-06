import {
  HttpService,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { getCurrencyApiUrl, getGuardianApiUrl } from '../shared/constants';
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
        return {
          actionName: getCurrencyApiUrl(),
        };
      }

      const {
        data: { value, from_currency },
      } = await this.httpService
        .get<EstimateResponse>(getGuardianApiUrl(token), {
          headers: {
            'x-api-key': this.config.apiKey,
          },
        })
        .toPromise();

      return {
        value,
        tokenName: from_currency,
        actionName: getCurrencyApiUrl(),
      };
    } catch (err) {
      throw new ServiceUnavailableException(err.message);
    }
  }
}
