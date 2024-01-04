import { $ } from '@wdio/globals'

import { Page } from 'page-objects/page'

class HomePage extends Page {

  navIsActive() {
    return super.navIsActive('home')
  }

  open() {
    return super.open('/')
  }
}

export default new HomePage()
