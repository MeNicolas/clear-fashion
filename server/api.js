const cors = require('cors')
const express = require('express')
const helmet = require('helmet')
const db = require('./db')

const PORT = process.env.PORT || 8080

const app = express()

module.exports = app

app.use(require('body-parser').json())
app.use(cors())
app.use(helmet())

app.options('*', cors());

app.get('/', (request, response) => {
  response.send({'ack': true})
});

app.get('/product/:id', async (req, res) => {
	const product = await db.find({'_id': req.params.id})
	res.send(product[0] || {})
});

app.get('/products/search/', async (req, res) => {
	const limit = parseInt(req.query.limit) || 12
	const brand = req.query.brand
	const price = parseInt(req.query.price)
	
	const collection = await db.collection()
	
	query = {}
	if (brand) query.brand = brand
	if (price) query.price = {'$lt': price}
	
	const result = await collection.find(query).limit(limit).toArray();
	
	res.send(result)
});

app.listen(PORT)
console.log(`📡 Running on port ${PORT}`)