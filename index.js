const request = require('request')
const cheerio = require('cheerio')

const url = 'http://www.cwb.gov.tw/V7/forecast/taiwan/Taipei_City.htm'

request(url, (err, res, body) => {
  const $ = cheerio.load(body)
  let weathers = []
  $('#box8 .FcstBoxTable01 tbody tr').each(function(i, elem) {
    weathers.push(
      $(this)
        .text()
        .split('\n')
    )
  })

  weathers = weathers.map(weather => ({
    time: weather[1].substring(2).split(' ')[0],
    temp: weather[2].substring(2),
    rain: weather[6].substring(2),
  }))

  console.log(weathers)
})
