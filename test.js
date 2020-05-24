/* 
https://datadome.co/bot-detection/will-playwright-replace-puppeteer-for-bad-bot-play-acting/
Stack:
Puppeteer: actual newest version
Puppeteer Extra: actual newest version
Puppeteer Stealth Plugin
Puppeteer Adblock Plugin
Configuration:
npm install puppeteer puppeteer-extra
npm install puppeteer-extra-plugin-stealth
npm install puppeteer-extra-plugin-adblocker
Conclusions:
WORKS
*/

const puppeteer = require('puppeteer-extra')

const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
puppeteer.use(AdblockerPlugin({ blockTrackers: true })) // <= Commenting this line started to display Captcha all the time

puppeteer.launch({ headless: true }).then(async browser => {
  const page = await browser.newPage();
  await page.setViewport({ width: rand(640,1280), height: rand(100,200) });
    var cookie = [ // <= Adding cookie solved problem with additional captcha protection
    {
        "domain": ".hepsiburada.com",
        "expirationDate": 2000000000,
        "hostOnly": false,
        "httpOnly": false,
        "name": "datadome",
        "path": "/",
        "sameSite": "Lax",
        "secure": true,
        "session": true,
        "storeId": "0",
        "value": "4SKb3FpkXV.~yhpneraFWWs6pz62W8YpJ-9s1aOkqxXUT5pfP3koy9KXxDT3PT8E5ft4Bzn0NtBfkfEYx6GLt299RxJCu1KIXC500I5l9I", // <= this string is generating randomly, need test
        "id": 1
    }
]
  await page.setCookie(...cookie);
  await page.goto('https://www.hepsiburada.com/tca-studio-make-up-far-eyeshadow-w-d-352-mor-p-HBV00000EIT3E')
  for (let i=0, i<=rand(7,17), $i++){
    await page.human(rand(500,1500), rand(1,1000), rand(1,200));
  }
  console.log(`Status: 200`);
  await browser.close()
})

const keys = ['t', 'e', 's', 'Enter'];

async human = (timer, x, y) => {
  await page.waitFor(timer);
  await page.mouse.move(x, y);
  await page.keyboard.press(keys[rand(0,3)]);
  await page.mouse.up();
}

rand = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
