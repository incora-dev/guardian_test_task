import { EstimateResponse } from './../types/index';
import {
  HttpModule,
  HttpService,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyService } from '../currency.service';
import { CurrencyResponse } from '../types';
import { Token } from '../types/enums';
import { AxiosResponse } from 'axios';
import { API_BASE_URL } from '../../shared/constants';
import { of } from 'rxjs/internal/observable/of';

describe('CurrencyService', () => {
  let service: CurrencyService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CurrencyService],
      imports: [HttpModule],
    }).compile();

    service = module.get<CurrencyService>(CurrencyService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getCurrencyHandler', () => {
    const token = Token.ETH;

    const result: CurrencyResponse = {
      tokenName: token,
      value: 2500,
    };

    const data: EstimateResponse = {
      from_currency: token,
      value: 2500,
      to_currency: 'EUR',
      converted_amount: 1,
      serviceFees: 1.2,
      estimatedExchangeRate: 2500,
    };

    const response: AxiosResponse<EstimateResponse> = {
      data,
      headers: {},
      config: {
        url: `${API_BASE_URL}/estimate?from_currency=EUR&from_amount=1&to_currency=${token}`,
      },
      status: 200,
      statusText: 'OK',
    };

    beforeEach(() => {
      jest.spyOn(httpService, 'get').mockImplementation(() => of(response));
    });

    it('http service should return mocked result', async () => {
      expect(await httpService.get(token).toPromise()).toBe(response);
    });

    it('should return result', async () => {
      expect(await service.getCurrencyHandler(token)).toMatchObject(result);
    });

    it('should throw error', async () => {
      const errorMessage = 'Invalid token';
      jest.spyOn(httpService, 'get').mockImplementationOnce(() => {
        throw new UnauthorizedException(errorMessage);
      });

      try {
        await service.getCurrencyHandler(token);
      } catch (err) {
        expect(err).toBeInstanceOf(ServiceUnavailableException);
        expect(err.message).toBe(errorMessage);
      }
    });
  });
});
