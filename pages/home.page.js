"use strict";

const { By } = require("selenium-webdriver");
const AllPages = require("./all.pages");

module.exports = class HomePage extends AllPages {
  #driver;
  constructor(webdriver) {
    super(webdriver);
    this.#driver = webdriver;
  }
  getHomePage() {
    this.#driver.get("https://www.saucedemo.com/");
  }
  getHomepageTitle() {
    return this.#driver.getTitle();
  }
  getUserName() {
    return this.#driver.findElement(By.id("user-name"));
  }
  getPassword() {
    return this.#driver.findElement(By.id("password"));
  }
  getLoginBtn() {
    return this.#driver.findElement(By.id("login-button"));
  }
};
