const puppeteer = require('puppeteer');

const USERNAME = 'obitopapa267536';
const PASSWORD = '70670882.Ka';
const GROUP_ID = '0b8e17b7-d9a2-4a8a-bf2d-c5024b8cea0a';

const NAMES = [
  'OBITO ON TOP',
  'BOT ACTIVE',
  'NC ACTIVE',
  'OBITO ENTER'
];

const DELAY = 10000;

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

  console.log('Login ka wait...');
  await new Promise(r => setTimeout(r, 15000));

  console.log('Group khol raha hai...');
  await page.goto('https://www.snapchat.com/web/' + GROUP_ID, { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 8000));

  console.log('Group khul gaya. Ab naam change karne ki koshish...');

  let i = 0;
  while (true) {
    const newName = NAMES[i];
    console.log('Naam change kar raha hai: ' + newName);

    try {
      // Group name pe click karo (pencil icon dhundhne ki koshish)
      // Yeh selector guess hai — sahi nahi bhi ho sakta
      const nameButton = await page.$('[class*="groupName"], [class*="GroupName"], [class*="title"]');
      
      if (nameButton) {
        await nameButton.click();
        await new Promise(r => setTimeout(r, 2000));

        // Naam type karo
        await page.keyboard.down('Control');
        await page.keyboard.press('KeyA');
        await page.keyboard.up('Control');
        await page.keyboard.press('Backspace');
        await page.keyboard.type(newName);
        await new Promise(r => setTimeout(r, 1000));

        // Enter ya Save
        await page.keyboard.press('Enter');
        console.log('Naam change ho gaya: ' + newName);
      } else {
        console.log('Naam change ka button nahi mila');
      }
    } catch (e) {
      console.log('Error:', e.message);
    }

    // Screenshot lo
    try {
      await page.screenshot({ path: '/tmp/snap_' + i + '.png' });
      console.log('Screenshot liya');
    } catch (e) {}

    i = (i + 1) % NAMES.length;
    await new Promise(r => setTimeout(r, DELAY));
  }
}

main().catch(console.error);
