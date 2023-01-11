import { Hono } from 'hono'
import books from '../db/books/books.json'

const app = new Hono()

app.get('/', (context) => context.json([
  {
    endpoint: '/books',
    description: 'Returns all books'
  }
])
)

app.get('/books', (context) => context.json(books))

export default app
