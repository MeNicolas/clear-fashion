const {MongoClient} = require('mongodb');
const scrape = require('./scrape.js')
const db = require('./db')

async function scrapeAndSave(url) {
	let products = await scrape(url)
	const result = await db.insert(products);
	console.log(`💽  ${result.insertedCount} inserted products`);
}

(async () => {
	let urls = ['https://dedicatedbrand.com/en/men/news', 'https://mudjeans.eu/collections/men', 'https://adresse.paris/602-nouveautes']
	
	await Promise.all(urls.map(scrapeAndSave))
	console.log(`Successfully scraped ${urls.length} websites !`)
})()