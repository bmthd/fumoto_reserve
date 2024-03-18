import { config } from "dotenv";
import { Page, chromium } from "playwright";

const url = `https://reserve.fumotoppara.net/reserved/reserved-calendar-list`;

const login = async (page: Page) => {
  const loginURL = "https://reserve.fumotoppara.net/";
  const email = process.env.email;
  const password = process.env.password;
  if (!email || !password) throw new Error();
  await page.goto(loginURL);
  await page.getByLabel("メールアドレス形式(例: xxx@yyy.zzz )").fill(email);
  await page.getByLabel("半角英数記号").fill(password);
  await page.getByRole("button", { name: "login ログイン" }).click();
};

const main = async () => {
  config();
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url);
  await login(page);
};

main();
