import { platformBrowserDynamic } from './platform-browser-dynamic';

describe('platformBrowserDynamic', () => {
  it('should work', () => {
    expect(platformBrowserDynamic()).toEqual('platform-browser-dynamic');
  });
});
