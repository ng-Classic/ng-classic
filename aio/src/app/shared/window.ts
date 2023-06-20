import { InjectionToken } from '@angular-classic/core';

export const WindowToken = new InjectionToken<Window>('Window');
export function windowProvider() { return window; }
