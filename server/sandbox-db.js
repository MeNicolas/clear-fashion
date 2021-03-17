const {MongoClient} = require('mongodb');
const scrape = require('./scrape.js')

const MONGODB_URI = 'mongodb+srv://nicolas:nicolas@cluster0.pmolv.mongodb.net?retryWrites=true&w=majority';
const MONGODB_DB_NAME = 'clearfashion';


(async () => {
	const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
	const db = client.db(MONGODB_DB_NAME)
	
	await scrape('https://adresse.paris/602-nouveautes')
})()