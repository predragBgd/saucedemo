"use strict";

const { By } = require("selenium-webdriver");
const AllPages = require("./all.pages");

module.exports = class CheckoutCompletePage extends AllPages {
  #driver;
  constructor(webdriver) {
    super(webdriver);
    this.#driver = webdriver;
  }
  getBackHomeBtn() {
    return this.#driver.findElement(By.id("back-to-products"));
  }
};
