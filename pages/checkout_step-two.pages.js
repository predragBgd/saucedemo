"use strict";

const { By } = require("selenium-webdriver");
const AllPages = require("./all.pages");

module.exports = class CheckoutStepTwoPage extends AllPages {
  #driver;
  constructor(webdriver) {
    super(webdriver);
    this.#driver = webdriver;
  }
  getFinishBtn() {
    return this.#driver.findElement(By.id("finish"));
  }
};
