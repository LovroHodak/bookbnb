const puppeteer = require("puppeteer");

const page_url = "https://www.airbnb.com/";

async function getAirbnb() {
  // headless: false = (open window)
  // defaultViewport: null = (open window in full screen)
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });
  const page = await browser.newPage();
  await page.goto(page_url, { waitUntil: "networkidle2" });

  // HOME PAGE
  await page.type(
    "input[data-testid=structured-search-input-field-query]",
    "Pula"
  );
  await page.click(
    "div[data-testid=structured-search-input-field-split-dates-0]"
  );
  await page.click("div[data-testid=datepicker-day-2021-12-20]");
  await page.click("div[data-testid=datepicker-day-2021-12-22]");

  /* await page.click("div._w64aej"); */

  await page.evaluate(() => {
    const buttons = [...document.querySelectorAll("form button:not([id])")];
    buttons[buttons.length - 1].click();
  });

  // RESULTS 1
  await page.waitForSelector("span[id^='title']");

  const getPonudbe = () => {
    let list = document.querySelectorAll("[itemprop=itemListElement]");
    return [...list].map((el) => ({
      title: el.querySelector("span[id^='title']").textContent,
    }));
  };

  const ponudbe = await page.evaluate(getPonudbe);
  console.log(ponudbe);
  console.log(ponudbe.length);

  await page.click("div[data-testid=menuItemButton-room_type]");
  await page.click(
    "div[data-testid=filterItem-room_type-checkbox-room_types-Private_room]"
  );
  const clickPromise = page.click(
    "button[data-testid=filter-panel-save-button]"
  );
  console.log(clickPromise);
  await clickPromise;

  const delay = (time) =>
    new Promise((resolve) => setTimeout(() => resolve(), time));
  await delay(5000);

  // THIS WORKS BUT IT HASNT LOADED NEW DATA YET
  /* await page.waitForFunction(async () => {
    let spanList = document.querySelectorAll("span._36rlri");
    return [...spanList].filter((el) => el.innerText.includes("Private room"));
  });
  console.log("done"); */

  // RESULTS 2
  const samoSoba = await page.evaluate(getPonudbe);

  console.log(samoSoba);
  console.log(samoSoba.length);

  // await browser.close()

  //await page.waitForSelector("span.a8jt5op.dir.dir-ltr");

  //await page.waitForFunction('document.querySelector("span.a8jt5op.dir.dir-ltr").value === "Entire place"');

  /* setTimeout(() => {page.screenshot({path: "airbnb.png"})}, 5000); 

    
    await page.screenshot({path: "airbnb1.png"})
    await page.screenshot({path: "airbnb2.png"})
    await page.screenshot({path: "airbnb3.png"}) */

  /* let mySelector = "span:contains('Private room')"
    await page.waitForSelector(mySelector) */

  // TUKI SE MORA USTAVT DA NARENDRA FILTRE IN POOL V RESULTS 2
  // lahko jih filtritam glede na .innerText.includes("Private room")
  // v consolo dobivam prazne {} ker se novi podatki se niso narendal

  //await page.waitForSelector("div[data-section-id=PAGINATED_HOMES:2:3:20]")

  //await page.waitForFunction('document.querySelector("span._36rlri").innerText.includes("Private room")')

  /* const waitForFilters = await page.evaluate(async () => {
        let spanList = document.querySelectorAll("span._36rlri")
        return [...spanList].filter(el => el.innerText.includes("Private room"))
    })

    console.log(waitForFilters)
    console.log(typeof waitForFilters) */

  // await browser.close()
}

module.exports = getAirbnb;
