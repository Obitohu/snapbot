const puppeteer = require('puppeteer');

// ===== SETTINGS =====
const USERNAME = 'obitopapa267536';
const PASSWORD = '70670882.Ka';
const GROUP_ID = '5d323893-37d1-4272-bd0c-bec055ffab89';

const NAMES = [
  'OBITO ON TOP',
  'BOT ACTIVE',
  'NC ACTIVE',
  'OBITO ENTER'
];

const DELAY = 8000;

// ===== MAIN BOT =====
async function main() {
  console.log('Bot start ho raha hai...');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--disable-gpu'
    ]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  console.log('Snapchat Web khol raha hai...');
  await page.goto('https://web.snapchat.com/', { waitUntil: 'networkidle2' });

  console.log('Login kar raha hai...');
  await page.waitForSelector('input[name="username"]', { timeout: 60000 });
  await page.type('input[name="username"]', USERNAME);
  await page.keyboard.press('Enter');
  await new Promise(r => setTimeout(r, 3000));

  await page.waitForSelector('input[name="password"]', { timeout: 60000 });
  await page.type('input[name="password"]', PASSWORD);
  await page.keyboard.press('Enter');

  console.log('Login ka wait kar raha hai...');
  await new Promise(r => setTimeout(r, 15000));

  console.log('Group khol raha hai...');
  await page.goto('https://www.snapchat.com/web/' + GROUP_ID, { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 8000));

  let i = 0;
  while (true) {
    const newName = NAMES[i];
    console.log('Naam change kar raha hai: ' + newName);

    try {
      console.log('Group settings khol raha hai...');
    } catch (e) {
      console.log('Error:', e.message);
    }

    i = (i + 1) % NAMES.length;
    await new Promise(r => setTimeout(r, DELAY));
  }
}

main().catch(console.error);
