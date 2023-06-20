import { InjectionToken } from '@angular-classic/core';

export const CurrentDateToken = new InjectionToken('CurrentDate');
export function currentDateProvider() { return new Date(); }
