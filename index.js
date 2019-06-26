const puppeteer = require("puppeteer");
const lighthouse = require("lighthouse");
const fs = require("fs");

const lightHouseConfig = {
  port: 9222,
  output: "json",
  settings: {
    emulatedFormFactor: "desktop",
  },
  disableStorageReset: true,
};
const puppeteerPortConfig = "9222";
const username = "replace_me";  //Replace replace_me with username  
const password = "replace_me";  //Replace replace_me with password
const URLS = ["replace_me","replace_me"]; //Replace replace_me with routes
const Domain = "replace_me"; //Replace replace_me with domain. Example : "http://example.com/"
const reportPath = "replace_me"; //Replace replace_me with path to save reports. Example : "/" 
let results;

async function startBrowser() {
  return puppeteer.launch({
    args: [`--remote-debugging-port=${puppeteerPortConfig}`],
    // headless: false, //Change the false to true to see puppeteer in action 
  });
}

async function startAuditOnPage() {
  const page = await browser.newPage();
  console.log("Started Lightomate");
  await page.goto(Domain, { waitUntil: "networkidle0" });
  console.log("Home Page Loaded");
  try {
    await page.goto(Domain + "replace_me", { waitUntil: "networkidle0" }); //Replace replace_me with router of login page. Example : "login"
    console.log(`Login Page Loaded`);
    try {
      await page.type("replace_me", username, { delay: 20 }); //Replace replace_me with email selector. Example : "input[name=username]"
      await page.type("replace_me", password, { delay: 20 }); //Replace replace_me with email selector. Example : "input[name=password]"
      const loginForm = await page.$(
        "replace_me"
      ); //Replace replace_me with submit selector. Example : "#content > div > section > div > div:nth-child(2) > form > div > div:nth-child(4) > button"
      const navigationPromise = page.waitForNavigation({
        waitUntil: "networkidle0",
        timeout: 50000,
      });
      await loginForm.click();
      await navigationPromise;
    } catch (err) {
      console.log(
        `Check Login Elements and Form submit Button : [ERROR] ${err}`
      );
      await crashAndLogError(err);
    }
    // console.log("DATA" + (await lighthouse(Domain + URLS[0], lightHouseConfig)));
    let json = [];
    for (let i = 0; i < URLS.length; i++) {
      try {
        // json.push(await lighthouse(Domain + URLS[i], lightHouseConfig));    
        let resultForUrl = await lighthouse(Domain + URLS[i], lightHouseConfig);
        fs.writeFile(
          `${reportPath + (URLS[i] == "" ? `index${[i]}` : URLS[i].replace(/\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:|\s/g,"-")) }.json`,
          JSON.stringify(resultForUrl),
          err => {
            if (err) {
              console.error(err);
              return;
            }
            console.log(`${Domain + URLS[i]} : JSON Report has been created`);
          }
        );        
      } catch (err) {
        console.log(`Error in LightHouse App : [ERROR] ${err}`);
        continue;
      }
    }
    return json;
  } catch (err) {
    console.log(`Couldn't Load Log in" : [ERROR] ${err}`);
    await crashAndLogError(err);
  }
}

async function crashAndLogError(err) {
  await browser.close();
  console.log("crashed" + err);
}

(async () => {
  try {
    browser = await startBrowser();
    results = await startAuditOnPage();
    // const ClickLogout = await page.$(
    //   "body > div.wrapper > div.main-header > nav > div > ul > li > ul > div > div.dropdown-user-scroll.scrollbar-outer.scroll-content > li:nth-child(2) > button"
    // );
    // const navigationPromise = page.waitForNavigation({
    //   waitUntil: "networkidle0",
    //   timeout: 50000,
    // });
    // await ClickLogout.click();
    // await navigationPromise;
    
    await browser.close();
    console.log("Done");
  } catch (err) {
    await crashAndLogError(err);
  }
})();
