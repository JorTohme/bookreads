import fs from 'node:fs'
import path from 'node:path'

// Book object
function addBook (title, author, price, coverImg, rating) {
  return {
    title,
    author,
    price,
    coverImg,
    rating
  }
}

// Regex to remove spaces
function cleanText (text) {
  return text
    .replace(/\s/, '')
    .replace(/\s\s+/g, '')
}

export const BOOK_BLOCKS = {
  BESTSELLERS: 'Bestselling Books',
  BESTSELLING_NEW_RELEASES: 'Bestselling new releases',
  BESTSELLING_MANGA: 'Bestselling Manga',
  BESTSELLERS_SPANISH: 'Bestsellers in Spanish',
  BESTSELLERS_CHILDREN: 'Children\'s Bestselling Books'
}

// Get all books from a specific block
export function loadBooksFromBlock ($, $blocks, selectedBlock) {
  const books = []

  $blocks.each((index, block) => {
    if ($(block).find('h2').text() === selectedBlock) {
      $(block).find('div.book-item').each((index, book) => {
        const title = cleanText($(book).find('h3.title').text())
        const author = cleanText($(book).find('p.author').text())
        const price = cleanText($(book).find('p.price').text())
        const coverImg = $(book).find('img').attr('data-lazy')
        const rating = $(book).find('div.rating-wrap').find('span.full-star').length + $(book).find('div.rating-wrap').find('span.half-star').length / 2
        books.push(addBook(title, author, price, coverImg, rating))
      })
    }
  })

  return books
}

export function returnAll (bookType) {
  const jsonsInDir = fs.readdirSync(`./db/books/${bookType}`).filter(file => path.extname(file) === '.json')
  const books = {}

  jsonsInDir.forEach(file => {
    const fileData = fs.readFileSync(path.join(`./db/books/${bookType}`, file))
    const json = JSON.parse(fileData.toString())

    const date = file.slice(0, -5)
    books[`${date}`] = json
  })

  return books
}
