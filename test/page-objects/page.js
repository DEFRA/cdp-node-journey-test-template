import { browser, $ } from '@wdio/globals'

class Page {
  get pageHeading() {
    return $('h1')
  }

  navItem(itemName) {
    return $(`[data-testid="nav-${itemName}"]`)
  }

  async navIsActive(itemName) {
    const navItem = await this.navItem(itemName)
    const className = await navItem.getAttribute('class')

    return className.includes('app-navigation__link--active')
  }

  open(path) {
    return browser.url(path)
  }
}

export { Page }
