const {MongoClient} = require('mongodb');
const scrape = require('./scrape.js')

const MONGODB_URI = 'mongodb+srv://nicolas:nicolas@cluster0.pmolv.mongodb.net?retryWrites=true&w=majority';
const MONGODB_DB_NAME = 'clearfashion';

let client
let db

async function scrapeAndSave(url) {
	let products = await scrape(url)
	try {
		await db.collection('products').insertMany(products, {ordered: false})
	} catch(error) {
		
	}
}

(async () => {
	client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
	db = client.db(MONGODB_DB_NAME)
	
	let urls = ['https://dedicatedbrand.com/en/men/news', 'https://mudjeans.eu/collections/men', 'https://adresse.paris/602-nouveautes']
	
	await Promise.all(urls.map(scrapeAndSave))
	console.log(`Successfully scraped ${urls.length} websites !`)
})()