const axios = require('axios');
const cheerio = require('cheerio');
const {'v5': uuidv5} = require('uuid');

/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */
const parse = data => {
  const $ = cheerio.load(data);

  return $('.collection-products div:first-child > .col')
    .map((i, element) => {
      const name = $(element)
        .find('.product-title')
        .text()
        .trim()
        .replace(/\s/g, ' ');
      const price = parseInt(
        $(element)
          .find('.product-price:first-child')
          .text()
          .trim()
          .replace('Buy€', '')
      );
      const link = 'https://mudjeans.eu' + 
        $(element)
          .find('.product-link').find('a')
          .attr('href')
          .trim()
          .replace(/\s/g, ' ');   
      const photo = 'https:' + 
        $(element)
          .find('.primary-image').find('img')
          .attr('src')
          .trim()
          .replace(/\s/g, ' ');
      const _id =  uuidv5(link, uuidv5.URL)
      
      return {_id, brand: 'mudjeans', name, price, link, photo};
    })
    .get();
};

/**
 * Scrape all the products for a given url page
 * @param  {[type]}  url
 * @return {Array|null}
 */
module.exports.scrape = async url => {
  const response = await axios(url);
  const {data, status} = response;

  if (status >= 200 && status < 300) {
    return parse(data);
  }

  console.error(status);

  return null;
};
