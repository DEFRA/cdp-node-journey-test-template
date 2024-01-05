import { browser, expect } from '@wdio/globals'

import ExamplePage from 'page-objects/example.page'

describe('Home page', () => {
  it('Should be on the "Home" page', async () => {
    await ExamplePage.open()

    await expect(browser).toHaveTitle('Journey Test | cdp-example-journey-test')

    await expect(ExamplePage.title()).toHaveText('Journey Test')
    await expect(ExamplePage.caption()).toHaveText('This is an example page.')
  })
})
