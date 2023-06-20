import { browser, element, by } from 'protractor';

describe('Component Overview', () => {

  beforeAll(() => browser.get(''));

  it('should display Angular Classicand Content Projection ', async () => {
    expect(await element(by.css('h2')).getText()).toEqual('Angular Classicand Content Projection');
  });

});
