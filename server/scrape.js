const sources = require('require-all')(`${__dirname}/sources`);


module.exports = async link => {
  const source = getHostnameFromRegex(link)
  console.log(source)
  const products = await sources[source].scrape(link);

  return products;
};

const getHostnameFromRegex = (url) => {
  // run against regex
  const matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
  // extract hostname (will be null if no match is found)
  return matches && matches[1];
}
