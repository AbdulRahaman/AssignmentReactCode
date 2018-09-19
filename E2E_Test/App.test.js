const faker = require("faker");
const puppeteer = require("puppeteer");
const mount = require("enzyme");

let browser;
let page;

beforeAll(async () => {
  // launch browser
  browser = await puppeteer.launch({
    headless: false
  });
  // creates a new page in the opened browser
  page = await browser.newPage();
  page.emulate({
    viewport: {
      width: 700,
      height: 800
    },
    userAgent: ""
  });
  await page.goto("http://localhost:3000/");
  await page.waitForSelector(".username");
});

describe("Search User", () => {
  test(
    "Should display a list of users",
    async () => {
      const list = await page.evaluate(result => {
        const usernames = Array.from(document.querySelectorAll(".username"));
        return usernames.map(user => {
          const name = user.textContent;
          return `${name}`;
        });
      });
      await page.screenshot({
        path: "./e2e_test/screenshots/users.jpg",
        fullPage: false
      });
      await expect(list.length>0);
    },
    16000
  );
  test(
    "Should found a record contains mrs",
    async () => {
      await page.type("input[name=search]", "mrs");
      await page.waitForSelector(".username");
      const list = await page.evaluate(result => {
        const usernames = Array.from(document.querySelectorAll(".username"));
        return usernames.map(user => {
          const name = user.textContent;
          return `${name}`;
        });
      });
      await expect(list[0]).toContain("mrs");
    },
    16000
  );
});

afterAll(() => {
  browser.close();
});
