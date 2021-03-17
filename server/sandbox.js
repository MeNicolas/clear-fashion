/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./sources/dedicatedbrand');
const mudjeans = require('./sources/mudjeans');
const adresseparis = require('./sources/adresseparis');

async function sandbox (eshop = 'https://adresse.paris/602-nouveautes') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    let products
    if (eshop.includes('dedicated'))
      products = await dedicatedbrand.scrape(eshop);
    else if (eshop.includes('mudjeans'))
      products = await mudjeans.scrape(eshop);
    else if (eshop.includes('adresse'))
      products = await adresseparis.scrape(eshop);

    console.log(products);
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;

sandbox(eshop);
