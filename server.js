var express = require('express');
var cors = require('cors');
require('dotenv').config()

var app = express();
let bodyParser = require('body-parser')
let multer = require('multer')
let upload = multer()

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.use(bodyParser.urlencoded({ extended: true }))

app.post('/api/fileanalyse', upload.single('upfile'), (req, res, next) => {
  console.log(req.file)
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  })
})


const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('The App is listening on port : '+ port)
})