"use strict";
require("chromedriver");
const webdriver = require("selenium-webdriver");
const { By, Key, until } = require("selenium-webdriver");
const { assert, expect } = require("chai");
const HomePage = require("../pages/home.page");
const InventoryPage = require("../pages/inventory.page");
const ChartPage = require("../pages/chart.page");
const CheckoutStepOnePage = require("../pages/checkout_step_one.page");
const CheckoutStepTwoPage = require("../pages/checkout_step-two.pages");
const CheckoutCompletePage = require("../pages/checkout_complete.page");

describe("SwagLabs test", () => {
  let driver;
  let homePage;
  let inventoryPage;
  let chartPage;
  let checkoutStepOne;
  let checkoutStepTwo;
  let checkoutComplete;

  let firstName = "Jerry";
  let lastName = "Drake";
  let postalCode = "11000";

  before(() => {
    driver = new webdriver.Builder().forBrowser("chrome").build();
    homePage = new HomePage(driver);
    inventoryPage = new InventoryPage(driver);
    chartPage = new ChartPage(driver);
    checkoutStepOne = new CheckoutStepOnePage(driver);
    checkoutStepTwo = new CheckoutStepTwoPage(driver);
    checkoutComplete = new CheckoutCompletePage(driver);
  });
  after(async () => {
    await driver.quit();
  });
  // afterEach(async () => {
  //   await driver.sleep(3000);
  // });
  it("Open SwagLabs homepage", async () => {
    await homePage.getHomePage();
  });
  it("Login to SwagLab page", async () => {
    expect(await homePage.getHomepageTitle()).to.eq("Swag Labs");
    await homePage.getUserName().sendKeys("standard_user");
    await homePage.getPassword().sendKeys("secret_sauce");
    await homePage.getLoginBtn().click();
    expect(await inventoryPage.getPageTitle()).to.eq("PRODUCTS");
  });
  it("Sort items by price and select 2 items", async () => {
    await inventoryPage.getSortProduct();
    expect(await inventoryPage.getSortProductValue()).to.eq(
      "PRICE (LOW TO HIGH)"
    );
    // dovde
    const sauceLabsOnesieBtn = await driver.findElement(
      By.id("add-to-cart-sauce-labs-onesie")
    );
    await sauceLabsOnesieBtn.click();
    let shoppingCartValue = await inventoryPage.getShoppingCartValue();
    expect(await shoppingCartValue.getText()).to.eq("1");
    const testAllTheThings = await driver.findElement(
      By.id("add-to-cart-test.allthethings()-t-shirt-(red)")
    );
    await testAllTheThings.click();
    expect(await shoppingCartValue.getText()).to.eq("2");
  });
  it("Go to Shopping Cart .....", async () => {
    await inventoryPage.getCart();
    // await driver.wait(until.elementLocated(By.xpath(`//span[@class="title"]`)));
    expect(await chartPage.getPageTitle()).to.eq("YOUR CART");
    await chartPage.getCheckout();
    expect(await checkoutStepOne.getPageTitle()).to.eq(
      "CHECKOUT: YOUR INFORMATION"
    );
    await checkoutStepOne.getFirstName().sendKeys(firstName);
    await checkoutStepOne.getLastName().sendKeys(lastName);
    await checkoutStepOne.getPostalCode().sendKeys(postalCode);
    await checkoutStepOne.getcontinueBtn().click();
    //dovde
    expect(await checkoutStepTwo.getPageTitle()).to.eq("CHECKOUT: OVERVIEW");
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
    await checkoutStepTwo.getFinishBtn().click();
    expect(await checkoutComplete.getPageTitle()).to.eq("CHECKOUT: COMPLETE!");
    await checkoutComplete.getBackHomeBtn().click();
    expect(await inventoryPage.getPageTitle()).to.eq("PRODUCTS");
  });
});
