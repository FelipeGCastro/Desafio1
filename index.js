const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

const logMiddleware = (req, res, next) => {
  const { age } = req.query

  if (!age) {
    return res.redirect('/')
  }

  return next()
}
nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')
app.get('/', (req, res) => {
  return res.render('form')
})
app.post('/check', (req, res) => {
  const { age } = req.body
  if (age >= 18) {
    return res.redirect(`/major?age=${age}`)
  }
  return res.redirect(`/minor?age=${age}`)
})
app.get('/major', logMiddleware, (req, res) => {
  const { age } = req.body
  return res.render('major', { age })
})
app.get('/minor', logMiddleware, (req, res) => {
  const { age } = req.body
  return res.render('minor', { age })
})

app.listen(3000)
