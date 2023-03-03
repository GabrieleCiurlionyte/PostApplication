/*
  File generates starting json data
  Uses "Casual" fake data generator
  https://github.com/boo1ean/casual
*/

module.exports = () => {
  var casual = require('casual');

  const GENERATED_AUTHOR_AMOUNT = 5;
  const GENERATED_ARTICLE_AMOUNT = 25;

  const data = {
    Authors: [],
    Articles: []
  }

  //Generates authors
  for (let i = 1; i <= GENERATED_AUTHOR_AMOUNT; i++) {
    let created = getRandomDate(0);
    let updated = getRandomDate(created.getTime());
    data.Authors.push({
      id: i,
      name: casual.full_name,
      created_at: created,
      updated_at: updated,
    })
  }

  //Generates articles
  for (let i = 1; i <= GENERATED_ARTICLE_AMOUNT; i++) {
    let created = getRandomDate(0);
    let updated = getRandomDate(created.getTime());
    data.Articles.push({
      id: i,
      title: casual.title,
      body : casual.text,
      author : casual.integer(from = 1, to = GENERATED_AUTHOR_AMOUNT), //take a valid id from generated authors
      created_at: created,
      updated_at: updated
    })
  }
  return data
}

function getRandomDate(createdDateStart) {
  const minTimestamp = createdDateStart;
  const maxTimestamp = Date.now();
  const randomTimestamp = Math.floor(Math.random() * (maxTimestamp - minTimestamp)) + minTimestamp;
  return new Date(randomTimestamp);
}


