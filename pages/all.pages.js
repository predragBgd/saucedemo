"use strict";

const { By } = require("selenium-webdriver");

module.exports = class AllPages {
  #driver;
  constructor(webdriver) {
    this.#driver = webdriver;
  }
  getPageTitle() {
    return this.#driver
      .findElement(By.xpath(`//span[@class="title"]`))
      .getText();
  }
};
