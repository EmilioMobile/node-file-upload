const fs = require('fs');
const express = require('express')
const server = express()
const cors = require('cors')
const upload = require('./upload')
const download = require('./download')
const path = require('path');

var corsOptions = {
  origin: '*',
  optionSuccessStatus: 200
}

server.set('view engine', 'pug');
server.use(cors(corsOptions))

server.use('/static', express.static(path.join(__dirname, 'uploads')))

server.post('/upload', upload)
server.get('/files/list', download)
server.get('/get-images', (req, res) => {
  let images = getImagesFromDir(path.join(__dirname, 'uploads'));
   res.render('index', { title: 'Node js – Auto Generate a Photo Gallery from a Directory', images: images })
});

server.listen(8000, () => {
  console.log('Server started')
})


// dirPath: target image directory
function getImagesFromDir(dirPath) {

  // All iamges holder, defalut value is empty
  let allImages = [];

  // Iterator over the directory
  let files = fs.readdirSync(dirPath);

  // Iterator over the files and push jpg and png images to allImages array.
  for (file of files) {
      let fileLocation = path.join(dirPath, file);
      var stat = fs.statSync(fileLocation);
      if (stat && stat.isDirectory()) {
          getImagesFromDir(fileLocation); // process sub directories
      } else if (stat && stat.isFile() && ['.jpeg', '.jpg', '.png'].indexOf(path.extname(fileLocation)) != -1) {
          allImages.push('static/'+file); // push all .jpf and .png files to all images
      }
  }

  // return all images in array formate
  return allImages;
}