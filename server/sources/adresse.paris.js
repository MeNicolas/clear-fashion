const axios = require('axios');
const cheerio = require('cheerio');

/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */
const parse = data => {
  const $ = cheerio.load(data);

  return $('.product_list .product-container')
    .map((i, element) => {
      if ($(element).find('.product-name').length == 0) return null
      
      const name = $(element)
        .find('.product-name:first')
        .text()
        .trim()
        .replace(/\s/g, ' ');
      const price = parseInt(
        $(element)
          .find('.product-price')
          .text()
          .trim()
          .replace('Buy€', '')
      );
      const url = $(element)
        .find('.product-name:first')
        .attr('href')
        .trim()
        .replace(/\s/g, ' ');
      const image = $(element)
        .find('.product_img_link').find('img:first')
        .attr('data-original')
        .trim()
        .replace(/\s/g, ' ');

      return {brand: 'adresseparis', name, price, url, image};
    })
    .filter(Boolean)
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
