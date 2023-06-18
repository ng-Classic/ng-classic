import { platformBrowser } from './platform-browser';

describe('platformBrowser', () => {
  it('should work', () => {
    expect(platformBrowser()).toEqual('platform-browser');
  });
});
