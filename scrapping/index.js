import * as cheerio from 'cheerio'

import { writeFile } from 'node:fs/promises'
import path from 'node:path'

// Books array
const books = []

// Scrapping
const res = await fetch('https://www.bookdepository.com/es/')
const html = await res.text()
const $ = cheerio.load(html)

const $bookBlocks = $('div.block-wrap')

// Book blocks indexes
const BOOK_BLOCKS = {
  BESTSELLERS: 'Bestselling Books',
  BESTSELLING_NEW_RELEASES: 'Bestselling new releases',
  BESTSELLING_MANGA: 'Bestselling Manga',
  BESTSELLERS_SPANISH: 'Bestsellers in Spanish',
  BESTSELLERS_CHILDREN: 'Children\'s Bestselling Books'
}

// ------------------------------------------------------------ //

getBookBlock(BOOK_BLOCKS.BESTSELLERS_CHILDREN)

const filePath = path.join(process.cwd(), './db/books/books.json')

await writeFile(filePath, JSON.stringify(books, null, 2), 'utf-8')

// ------------------------------------------------------------ //

// --Utils--
// Regex to remove spaces
function cleanText (text) {
  return text
    .replace(/\s/, '')
    .replace(/\s\s+/g, '')
}

// Add book to books array
function addBook (title, author, price, coverImg, rating) {
  books.push({
    title,
    author,
    price,
    coverImg,
    rating
  })
}

// Get book block
function getBookBlock (bookBlock) {
  $bookBlocks.each((index, block) => {
    if ($(block).find('h2').text() === bookBlock) {
      $(block).find('div.book-item').each((index, book) => {
        const title = cleanText($(book).find('h3.title').text())
        const author = cleanText($(book).find('p.author').text())
        const price = cleanText($(book).find('p.price').text())
        const coverImg = $(book).find('img').attr('data-lazy')
        const rating = $(book).find('div.rating-wrap').find('span.full-star').length + $(book).find('div.rating-wrap').find('span.half-star').length / 2
        addBook(title, author, price, coverImg, rating)
      })
    }
  })
}
