import { Hono } from 'hono'
import { cors } from 'hono/cors'

import bestsellers from '../db/books/bestsellers.json'
import bestsellersSpanish from '../db/books/bestsellersSpanish.json'
import bestsellersChildren from '../db/books/bestsellers-children.json'
import totalBooks from '../db/books/totalBooks.json'

const app = new Hono()
app.use(cors({ origin: '*' }))

app.get('/', (context) => context.json([
  {
    endpoint: '/bestsellers',
    description: 'Returns all the bestsellers',
    parameters: {
      name: 'date',
      endpoint: '/bestsellers/:date',
      description: 'Returns all the bestsellers books on the specified day',
      format: 'DD-M-YYYY | Months and days with one digit must NOT have a 0 before the number. Example: 12-1-2023'
    }
  },
  {
    endpoint: '/bestsellersSpanish',
    description: 'Returns all the bestsellers in spanish',
    parameters: {
      name: 'date',
      endpoint: '/bestsellersSpanish/:date',
      format: 'DD-M-YYYY | Months and days with one digit must NOT have a 0 before the number. Example: 12-1-2023',
      description: 'Returns all the bestsellers in spanish on the specified day'
    }
  },
  {
    endpoint: '/bestsellers-children',
    description: 'Returns all the children\'s bestsellers',
    parameters: {
      name: 'date',
      endpoint: '/bestsellers-children/:date',
      format: 'DD-M-YYYY | Months and days with one digit must NOT have a 0 before the number. Example: 12-1-2023',
      description: 'Returns all the children\'s bestsellers on the specified day'
    }
  },
  {
    endpoint: '/totalBooks',
    description: 'Returns the number of books in the database'
  }
])
)

// Bestsellers
app.get('/bestsellers', (context) =>
  context.json(bestsellers)
)

app.get('/bestsellers/:date', (context) => {
  const date = context.req.param('date')
  return bestsellers[date] ? context.json(bestsellers[date]) : context.json({ error: 'No books found for that date' })
})

// Bestsellers in Spanish

app.get('/bestsellersSpanish', (context) =>
  context.json(bestsellersSpanish)
)

app.get('/bestsellersSpanish/:date', (context) => {
  const date = context.req.param('date')
  return bestsellersSpanish[date] ? context.json(bestsellersSpanish[date]) : context.json({ error: 'No books found for that date' })
})

// Bestsellers Children

app.get('/bestsellers-children', (context) =>
  context.json(bestsellersChildren)
)

app.get('/bestsellers-children/:date', (context) => {
  const date = context.req.param('date')
  return bestsellersChildren[date] ? context.json(bestsellersChildren[date]) : context.json({ error: 'No books found for that date' })
})

// Total books

app.get('/totalBooks', (context) => {
  return context.json({ totalBooks })
})

export default app
