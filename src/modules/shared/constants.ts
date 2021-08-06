import { Token } from './../currency/types/enums';
export const GUARDIAN_API_BASE_URL = 'https://api-payments.guardarian.com/v1';

export const getGuardianApiUrl = (token: Token): string =>
  `${GUARDIAN_API_BASE_URL}/estimate?from_currency=EUR&from_amount=1&to_currency=${token}`;

export const getCurrencyApiUrl = (): string =>
  `http://localhost:${process.env.PORT}/currency?token=`;
