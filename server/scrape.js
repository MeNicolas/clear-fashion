const parseDomain = require('parse-domain');
const sources = require('require-all')(`${__dirname}/sources`);


module.exports = async link => {
  const source = parseDomain.parseDomain(link);
  console.log(source)
  const products = await sources[source].scrape(link);

  return products;
};
