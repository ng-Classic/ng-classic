import { Injectable } from '@angular-classic/core';

@Injectable()
export class TaxRateService {
  getRate(rateName: string) { return 0.10; } // 10% everywhere
}
