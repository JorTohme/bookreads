import * as cheerio from 'cheerio'
import { writeFile } from 'node:fs/promises'
import path from 'node:path'

// import { loadBooksFromBlock, BOOK_BLOCKS, returnAll } from './utils.js'

// // Getting the actual date for the database
// const date = new Date()
// const day = date.getDate()
// const month = date.getMonth() + 1
// const year = date.getFullYear()

// // Scrapping Bookdepository
// const res = await fetch('https://www.bookdepository.com/es/')
// const html = await res.text()
// const $ = cheerio.load(html)

// const $bookBlocks = $('div.block-wrap')

// const bestsellers = loadBooksFromBlock($, $bookBlocks, BOOK_BLOCKS.BESTSELLERS)
// const bestsellersSpanish = loadBooksFromBlock($, $bookBlocks, BOOK_BLOCKS.BESTSELLERS_SPANISH)
// const bestsellersChildren = loadBooksFromBlock($, $bookBlocks, BOOK_BLOCKS.BESTSELLERS_CHILDREN)

// Scrapping Cúspide
const resCuspide = await fetch('https://www.cuspide.com/')
const htmlCuspide = await resCuspide.text()
const $cuspide = cheerio.load(htmlCuspide)

const bestselledThisWeek = {
  img: $cuspide('img#ctl00_ContentPlaceHolder1_top100_rptMasVendidos_ctl00_img_tapa').attr('data-original'),
  title: $cuspide('img#ctl00_ContentPlaceHolder1_top100_rptMasVendidos_ctl00_img_tapa').attr('title'),
  buyLink: 'https://www.cuspide.com/' + $cuspide('a#ctl00_ContentPlaceHolder1_top100_rptMasVendidos_ctl00_a_tapa_libro').attr('href')
}

// // Creating the scrapping files
// const filePathBestsellers = path.join(process.cwd(), `./db/books/bestsellers/${day}-${month}-${year}.json`)
// await writeFile(filePathBestsellers, JSON.stringify(bestsellers, null, 2), 'utf-8')

// const filePathBestsellersSpanish = path.join(process.cwd(), `./db/books/bestsellersSpanish/${day}-${month}-${year}.json`)
// await writeFile(filePathBestsellersSpanish, JSON.stringify(bestsellersSpanish, null, 2), 'utf-8')

// const filePathBestsellersChildren = path.join(process.cwd(), `./db/books/bestsellers-children/${day}-${month}-${year}.json`)
// await writeFile(filePathBestsellersChildren, JSON.stringify(bestsellersChildren, null, 2), 'utf-8')

const filePathBestselledThisWeek = path.join(process.cwd(), './db/books/bestselledThisWeek.json')
await writeFile(filePathBestselledThisWeek, JSON.stringify(bestselledThisWeek, null, 2), 'utf-8')

// // Creating the file with all the books
// const ALL_BESTSELLERS = returnAll('bestsellers')
// const filePathAllBestsellers = path.join(process.cwd(), './db/books/bestsellers.json')
// await writeFile(filePathAllBestsellers, JSON.stringify(ALL_BESTSELLERS, null, 2), 'utf-8')

// const ALL_BESTSELLERSINSPANISH = returnAll('bestsellersSpanish')
// const filePathAllBestsellersSpanish = path.join(process.cwd(), './db/books/bestsellersSpanish.json')
// await writeFile(filePathAllBestsellersSpanish, JSON.stringify(ALL_BESTSELLERSINSPANISH, null, 2), 'utf-8')

// const ALL_BESTSELLERSCHILDREN = returnAll('bestsellers-children')
// const filePathAllBestsellersChildren = path.join(process.cwd(), './db/books/bestsellers-children.json')
// await writeFile(filePathAllBestsellersChildren, JSON.stringify(ALL_BESTSELLERSCHILDREN, null, 2), 'utf-8')

// // Total books
// let totalBooks = 0

// for (const day in ALL_BESTSELLERS) {
//   totalBooks += Object.entries(day).length
// }

// for (const day in ALL_BESTSELLERSINSPANISH) {
//   totalBooks += Object.entries(day).length
// }

// for (const day in ALL_BESTSELLERSCHILDREN) {
//   totalBooks += Object.entries(day).length
// }

// const filePathTotalBooks = path.join(process.cwd(), './db/books/totalBooks.json')
// await writeFile(filePathTotalBooks, JSON.stringify(totalBooks, null, 2), 'utf-8')
