const puppeteer = require("puppeteer");

const page_url = "https://www.airbnb.com/s/Pula/homes?tab_id=home_tab&refinement_paths%5B%5D=%2Fhomes&flexible_trip_dates%5B%5D=december&flexible_trip_dates%5B%5D=january&flexible_trip_lengths%5B%5D=weekend_trip&date_picker_type=calendar&checkin=2021-11-29&checkout=2021-11-30&source=structured_search_input_header&search_type=filter_change";

async function getOneBnb (){
    const browser = await puppeteer.launch({headless: false, defaultViewport: null})
    const page = await browser.newPage()
    await page.goto(page_url, {waitUntil: "networkidle2"})


    await page.waitForSelector("[data-testid=explore-section-dismiss-animation-wrapper]");

    const ponudbe = await page.evaluate(async () => {
        let list = document.querySelectorAll("div._8ssblpx")
        
        return [...list].map((el) => ({
            title: el.querySelector("span._im5s6sq").textContent
        }))
    })

    console.log(ponudbe)
    console.log(ponudbe.length)
    



    // await browser.close()
}

module.exports = getOneBnb