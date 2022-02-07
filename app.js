const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const mongoose = require('mongoose')

const homeStartingContent =
  'Hello Everyone here you can see the latest new & articles various types of blogs Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
const aboutContent =
  'We created this website for demo its underworking its a model for upcoming "blogxman". thanks if you have any questions & pls feedback us on the official website at http://zaheerkhan.online Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.'
const contactContent =
  'Hey Everyone for contact with us you can contact at codxmaninfo@gmail.com or zaheerkhan01040@gmail.com. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.'

const app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

mongoose.connect(
  'mongodb+srv://admin-zk-blogup:zxcvbnmn$@blogup.csq0p.mongodb.net/blogDB',
  { useNewUrlParser: true }
)

const postSchema = {
  title: String,
  content: String,
}

const Post = mongoose.model('Post', postSchema)

app.get('/', function (req, res) {
  Post.find({}, function (err, posts) {
    res.render('home', {
      startingContent: homeStartingContent,
      posts: posts,
    })
  })
})

app.get('/compose', function (req, res) {
  res.render('compose')
})

app.post('/compose', function (req, res) {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody,
  })

  post.save(function (err) {
    if (!err) {
      res.redirect('/')
    }
  })
})

app.get('/posts/:postId', function (req, res) {
  const requestedPostId = req.params.postId

  Post.findOne({ _id: requestedPostId }, function (err, post) {
    res.render('post', {
      title: post.title,
      content: post.content,
    })
  })
})

app.get('/about', function (req, res) {
  res.render('about', { aboutContent: aboutContent })
})

app.get('/contact', function (req, res) {
  res.render('contact', { contactContent: contactContent })
})

const port = process.env.PORT

if (port == null || port == '') {
  port = 3000
}

app.listen(port, function () {
  console.log('Server started on port 3000')
})
