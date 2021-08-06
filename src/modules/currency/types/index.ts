import { Token } from './enums';

export interface EstimateResponse {
  to_currency: string;
  from_currency: Token;
  to_network?: string;
  from_network?: string;
  value: number;
  serviceFees: number;
  estimatedExchangeRate: number;
  converted_amount: number;
}

export interface CurrencyResponse {
  value?: number;
  tokenName?: string;
  actionName: string;
}
