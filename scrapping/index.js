import * as cheerio from 'cheerio'

const res = await fetch('https://www.bookdepository.com/es/')
const html = await res.text()

const $ = cheerio.load(html)

$('div.block-wrap').each((index, el) => {
  if ($(el).find('h2').text() === 'Bestselling Books') {
    $(el).find('div.book-item').each((index, el2) => {
      const title = $(el2).find('h3.title').text()
      const author = $(el2).find('p.author').text()
      const price = $(el2).find('p.price').text()
      console.log(title, author, price)
    })
  }
})
