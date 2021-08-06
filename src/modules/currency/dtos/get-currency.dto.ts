import { IsEnum, IsOptional } from 'class-validator';
import { Token } from '../types/enums';

export class FindCurrencyQueryDto {
  @IsEnum(Token)
  @IsOptional()
  token?: Token;
}
