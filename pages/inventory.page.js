"use strict";

const { By } = require("selenium-webdriver");
const AllPages = require("./all.pages");

module.exports = class InventoryPage extends AllPages {
  #driver;
  constructor(webdriver) {
    super(webdriver);
    this.#driver = webdriver;
  }
  getSortProduct() {
    const selectFilter = this.#driver.findElement(
      By.xpath(
        `//*[@id="header_container"]/div[2]/div[2]/span/select/option[3]`
      )
    );
    return selectFilter.click();
  }
  getSortProductValue() {
    return this.#driver
      .findElement(
        By.xpath(`//*[@id="header_container"]/div[2]/div[2]/span/span`)
      )
      .getText();
  }
  getShoppingCartValue() {
    return this.#driver.findElement(By.xpath(`//a[1]/span`));
  }
  getCart() {
    const shoppingCartBtn = this.#driver.findElement(By.xpath(`//a[1]/span`));
    return shoppingCartBtn.click();
  }
};
