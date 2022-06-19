const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
mongoose.connect('mongodb://localhost/blog', {useNewUrlParser: true, useUnifiedTopology: true})
// Seting view engine to ejs
app.set('view engine', 'ejs')

// Setting articles Router
app.use(express.urlencoded({ extended: false}))
app.use(methodOverride('_method'))

// Making get route
app.get('/', async (req,res) => {
    const articles = await Article.find().sort({ createdAt: 'desc'})
    res.render('articles/index', { articles: articles})
})
app.use('/articles', articleRouter)
app.listen(5000)