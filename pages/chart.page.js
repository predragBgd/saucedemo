"use strict";

const { By } = require("selenium-webdriver");
const AllPages = require("./all.pages");

module.exports = class ChartPage extends AllPages {
  #driver;
  constructor(webdriver) {
    super(webdriver);
    this.#driver = webdriver;
  }
  getCheckout() {
    const checkoutBtn = this.#driver.findElement(By.id("checkout"));
    return checkoutBtn.click();
  }
};
