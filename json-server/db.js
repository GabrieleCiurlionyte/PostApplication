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

  //Unix time converter
  function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = year + ' ' + month + ' ' + date + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }

  function generateValidUpdateTime(creationTimeUnix){
    // TODO crete a more efficient approach
    let update_time;
    do {
      update_time = casual.unix_time;
    } while (update_time < creationTimeUnix);
    return update_time;
  }

  //Generates authors
  for (let i = 1; i <= GENERATED_AUTHOR_AMOUNT; i++) {
    let creationTimeUnix = casual.unix_time;
    let updateTimeUnix = generateValidUpdateTime(creationTimeUnix);
    data.Authors.push({
      id: i,
      name: casual.full_name,
      created_at: timeConverter(creationTimeUnix),
      updated_at: timeConverter(updateTimeUnix)
    })
  }

  //Generates articles
  for (let i = 1; i <= GENERATED_ARTICLE_AMOUNT; i++) {
    let creationTimeUnix = casual.unix_time;
    let updateTimeUnix = generateValidUpdateTime(creationTimeUnix);
    data.Articles.push({
      id: i,
      title: casual.title,
      body : casual.text,
      author : casual.integer(from = 1, to = GENERATED_AUTHOR_AMOUNT), //take a valid id from generated authors
      created_at: timeConverter(creationTimeUnix),
      updated_at: timeConverter(updateTimeUnix)
    })
  }
  return data
}
