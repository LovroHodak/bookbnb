const puppeteer = require("puppeteer");

const page_url = "https://www.booking.com";

const cityName = 'Zagreb'

const fromMonth = '12'
const fromDay = '20'
const toMonth = '12'
const toDay = '22'


async function getBookings() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });
  const page = await browser.newPage();
  await page.goto(page_url, { waitUntil: "networkidle2" });

  await page.click("button#onetrust-accept-btn-handler");

  await page.type("input[name=ss]", cityName);

  await page.click(".xp__dates.xp__group");

  await page.evaluate(async (month, day) => {
    document.querySelector(`td[data-date='2021-${month}-${day}']`).click();
  }, fromMonth, fromDay);

  await page.evaluate(async (month, day) => {
    document.querySelector(`td[data-date='2021-${month}-${day}']`).click();
  }, toMonth, toDay);


  /* await page.evaluate(async () => {
    document.querySelector(`td[data-date='2021-${fromMonth}-${fromDay}']`).click();
  });

  await page.evaluate(async () => {
    document.querySelector(`td[data-date='2021-${toMonth}-${toDay}']`).click();
  }); */

  await page.click("button[type=submit]");

  await page.waitForSelector("[data-testid=property-card]");

  const ponudbe = await page.evaluate(async () => {
    let list = document.querySelectorAll("[data-testid=property-card]");
    //await new Promise(res => setTimeout(res, 5000))
    return [...list].map((el) => ({
      title: el.querySelector("[data-testid=title]")?.innerText,
      price: el.querySelector('[data-testid="price-and-discounted-price"]')
        .lastChild?.innerText,
      link: el
        .querySelector("[data-testid=title-link]")
        .href.split("?label")[0],
      score: el
        .querySelector("[data-testid=review-score]")
        ?.innerText.split("\n")[0],
    }));
  });

  //screenshot
  console.log(ponudbe);
  await page.screenshot({ path: "booking.png" });

  //await browser.close();
}

module.exports = getBookings;
