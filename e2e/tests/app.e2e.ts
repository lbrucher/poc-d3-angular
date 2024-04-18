
import {setupBrowserHooks, getBrowserState} from './utils';

describe('App test', function () {
  setupBrowserHooks();

  it('is running', async function () {
    const {page} = getBrowserState();
    const text = await page.locator('.navbar-brand').map(el => el.textContent).wait();
    expect(text).toEqual('The Best Banking Company');
  });

  it('shows a popup when clicking on a client\'s account balances bar chart', async function () {
    const {page} = getBrowserState();
    await page.locator('.clients > .content > ul > li:first-child .client .account-chart-container > .account-chart').click();

    const modalTitleText = await page.locator('body > .modal .modal-header > .modal-title').map(el => el.textContent).wait();
    expect(modalTitleText).toEqual('Brian OReilly');
  });

  // TODO there is obviously many more tests to implement...
});
