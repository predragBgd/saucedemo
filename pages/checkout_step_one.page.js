"use strict";

const { By } = require("selenium-webdriver");
const AllPages = require("./all.pages");

module.exports = class CheckoutStepOnePage extends AllPages {
  #driver;
  constructor(webdriver) {
    super(webdriver);
    this.#driver = webdriver;
  }
  getFirstName() {
    return this.#driver.findElement(By.id("first-name"));
  }
  getLastName() {
    return this.#driver.findElement(By.id("last-name"));
  }
  getPostalCode() {
    return this.#driver.findElement(By.id("postal-code"));
  }
  getcontinueBtn() {
    return this.#driver.findElement(By.id("continue"));
  }
};
