"use strict";
require("chromedriver");
const webdriver = require("selenium-webdriver");
const { By, Key, until } = require("selenium-webdriver");
const { assert, expect } = require("chai");

describe("SwagLabs test", () => {
  let driver;
  let firstName = "Jerry";
  let lastName = "Drake";
  let postalCode = "11000";
  before(() => {
    driver = new webdriver.Builder().forBrowser("chrome").build();
  });
  after(async () => {
    // await driver.sleep(3000);
    await driver.quit();
  });
  // afterEach(async () => {
  //   await driver.sleep(3000);
  // });
  it("Open SwagLabs homepage", async () => {
    await driver.get("https://www.saucedemo.com/");
    expect(await driver.getCurrentUrl()).to.eq("https://www.saucedemo.com/");
  });
  it("Login to SwagLab page", async () => {
    await driver.findElement(By.id("user-name")).sendKeys("standard_user");
    await driver.findElement(By.id("password")).sendKeys("secret_sauce");
    await driver.findElement(By.id("login-button")).click();
    expect(
      await driver.findElement(By.xpath(`//span[@class="title"]`)).getText()
    ).to.eq("PRODUCTS");
  });
  it("Sort items by price and select ......", async () => {
    const selectFilter = await driver.findElement(
      By.xpath(
        `//*[@id="header_container"]/div[2]/div[2]/span/select/option[3]`
      )
    );
    await selectFilter.click();
    const filterResult = await driver
      .findElement(
        By.xpath(`//*[@id="header_container"]/div[2]/div[2]/span/span`)
      )
      .getText();
    expect(filterResult).to.eq("PRICE (LOW TO HIGH)");
    const sauceLabsOnesieBtn = await driver.findElement(
      By.id("add-to-cart-sauce-labs-onesie")
    );
    await sauceLabsOnesieBtn.click();
    let shoppingCart = await driver.findElement(By.xpath(`//a[1]/span`));
    expect(await shoppingCart.getText()).to.eq("1");
    const testAllTheThings = await driver.findElement(
      By.id("add-to-cart-test.allthethings()-t-shirt-(red)")
    );
    await testAllTheThings.click();
    expect(await shoppingCart.getText()).to.eq("2");
  });
  it("Go to Shopping Cart .....", async () => {
    const shoppingCartBtn = await driver.findElement(By.xpath(`//a[1]/span`));
    shoppingCartBtn.click();
    await driver.wait(until.elementLocated(By.xpath(`//span[@class="title"]`)));
    expect(
      await driver.findElement(By.xpath(`//span[@class="title"]`)).getText()
    ).to.eq("YOUR CART");
    const checkoutBtn = await driver.findElement(By.id("checkout"));
    await checkoutBtn.click();
    expect(
      await driver.findElement(By.xpath(`//span[@class="title"]`)).getText()
    ).to.eq("CHECKOUT: YOUR INFORMATION");
    const firstNameSend = await driver.findElement(By.id("first-name"));
    await firstNameSend.sendKeys(firstName);
    const lastNameSend = await driver.findElement(By.id("last-name"));
    await lastNameSend.sendKeys(lastName);
    const postalCodeSend = await driver.findElement(By.id("postal-code"));
    await postalCodeSend.sendKeys(postalCode);
    const continueBtn = await driver.findElement(By.id("continue"));
    await continueBtn.click();
    expect(
      await driver.findElement(By.xpath(`//span[@class="title"]`)).getText()
    ).to.eq("CHECKOUT: OVERVIEW");
    const pricesSauceLabsOnesie = await driver.findElement(
      By.xpath(
        `//*[@id="checkout_summary_container"]/div/div[1]/div[3]/div[2]/div[2]/div`
      )
    );
    const priceeTestAllTheThings = await driver.findElement(
      By.xpath(
        `//*[@id="checkout_summary_container"]/div/div[1]/div[4]/div[2]/div[2]/div`
      )
    );
    const priceTotal = await driver.findElement(
      By.xpath(`//*[@id="checkout_summary_container"]/div/div[2]/div[5]`)
    );
    const total = Number(
      (await priceTotal.getText()).replace("Item total: $", "")
    );
    const price1 = Number(
      (await pricesSauceLabsOnesie.getText()).replace("$", "")
    );
    const price2 = Number(
      (await priceeTestAllTheThings.getText()).replace("$", "")
    );
    expect(price1 + price2).to.eq(total);
    const finishBtn = await driver.findElement(By.id("finish"));
    await finishBtn.click();
    expect(
      await driver.findElement(By.xpath(`//span[@class="title"]`)).getText()
    ).to.eq("CHECKOUT: COMPLETE!");
    const backHomeBtn = await driver.findElement(By.id("back-to-products"));
    backHomeBtn.click();
    await driver.wait(until.elementLocated(By.xpath(`//span[@class="title"]`)));
    expect(
      await driver.findElement(By.xpath(`//span[@class="title"]`)).getText()
    ).to.eq("PRODUCTS");
  });
});
