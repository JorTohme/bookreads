<div align="center">
<h1>Bookreads Project</h1>

[![Scrap Bookdepository](https://github.com/JorTohme/bookreads/actions/workflows/npm-run-scrapper.yml/badge.svg?branch=main)](https://github.com/JorTohme/bookreads/actions/workflows/npm-run-scrapper.yml) [![Deploy API](https://github.com/JorTohme/bookreads/actions/workflows/cloudflare-workers.yml/badge.svg?branch=main)](https://github.com/JorTohme/bookreads/actions/workflows/cloudflare-workers.yml)

<h2><a href='https://api.bookreads.dev/'>API</a> (En desarollo) | <a href='https://bookreads.dev'/>WEB</a> (Proximamente)</h2>
</div>

## Descripción y por qué del proyecto

El proyecto Bookreads es un monorepo que contiene un Scrapper, una API y una página web. El scrapper obtiene información de libros de la página web [Bookdepository](https://www.bookdepository.com/) y la API distribuída en Cloudflare la devuelve en formato JSON. La página web muestra los libros obtenidos de la API con un sistema de reseñas y en un futuro **análisis de los datos obtenidos a lo largo del tiempo** respecto a los libros más vendidos, los más valorados, etc.

La idea del proyecto nace al ver el proyecto de la [Kings League Infojobs](https://github.com/midudev/kings-league-project) de Midudev (programador al cual sigo, aprendo y admiro) y querer hacer algo parecido pero con libros. Además, me gustaría añadir *data analysis* a los datos obtenidos a lo largo del tiempo.

## Tecnologías usadas

### API y Scrapper
Para la API uso *Web Scraping* con [Node.js](https://nodejs.org/es/) y [Cheerio.js](https://github.com/cheeriojs/cheerio), los datos son extraídos repitiendo este script mediante Github Actions programadas en Crontab (ver el fichero *.github/workflows*) y se almacenan en un fichero JSON (ver fichero *db*). Al instante que se actualiza la información, se despliega la API en [Cloudflare Workers](https://workers.cloudflare.com/) (ver fichero *wrangler.toml* y *api/index.js*). La API está desarrollada con [Node.js](https://nodejs.org/es/) y [Hono](https://honojs.dev/).

**¿Por qué Cloudflare Workers?** Porque es un servicio de hosting de APIs gratuito y muy fácil de usar. Además la API se distribuye en puntos alrededor de todo el mundo y esto permite latencias mínimas en todos los países.

**¿Por qué no usar una base de datos (como MongoDB)?** Aunque no lo descarto a futuro, los datos que manejo son muy pequeños y no necesito una base de datos para almacenarlos. Además, el uso de un fichero JSON me permite tener un control total sobre los datos y no depender de un servicio externo. También recordemos que son datos públicos extraídos de una página web, no es información sensible.

### Página web

La página web está desarrollada con el framework [Astro](https://astro.build/) para probarlo y, además, aprovechar que es muchísimo más rápido que otros Frameworks o tecnologías como Next.js o React. Para la estilización uso [Tailwind](https://tailwindcss.com/) para mantener un estilo conciso y no escribir CSS.

## API

Dirección de la API: https://api.bookreads.dev/

Para el proyecto se compró un dominio personalizado en [Porkbun](https://porkbun.com/) (https://bookreads.dev/) y se usa el subdominio *api* para la API.

Endpoints: **CONTINUA EN DESARROLLO**

- GET `/bestsellers`: Devuelve un json con objetos de key fechas y value los bestsellers de esa fecha en Bookdepository.
- GET `/bestsellers/:date`: Devuelve los bestsellers de ese día en Bookdepository.
- GET `/bestsellersSpanish`: Devuelve un json con objetos de key fechas y value los bestsellers en español de esa fecha en Bookdepository.
- GET `/bestsellersSpanish/:date`: Devuelve los bestsellers de ese día en Bookdepository.
- GET `/bestsellersManga`: Devuelve un json con objetos de key fechas y value los bestsellers de manga en esa fecha en Bookdepository.
- GET `/bestsellersManga/:date`: Devuelve los bestsellers de manga de ese día en Bookdepository.
