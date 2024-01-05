import { $ } from '@wdio/globals'

import { Page } from 'page-objects/page'

class ExamplePage extends Page {
  navIsActive() {
    return super.navIsActive('home')
  }

  title() {
    return $(`[data-testid="app-heading-title"]`)
  }

  caption() {
    return $(`[data-testid="app-heading-caption"]`)
  }

  open() {
    return super.open('/cdp-example-journey-test')
  }
}

export default new ExamplePage()
