
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
    // locate the second client as the first one does not have accounts!
    await page.locator('.clients > .content > ul > li:nth-child(2) .client .account-chart-container > .account-chart').click();

    const modalTitleText = await page.locator('body > .modal .modal-header > .modal-title').map(el => el.textContent).wait();
    expect(modalTitleText).toEqual('Bart Simpson');
  });

  // TODO there are obviously many more tests to implement...
});
