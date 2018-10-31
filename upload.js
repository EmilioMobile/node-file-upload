const IncomingForm = require('formidable').IncomingForm

module.exports = function upload(req, res) {
  var form = new IncomingForm().parse(req)

  form.on('field', (name, field) => {
    console.log('Field', name, field)
  })

  form.on('file', (name, file) => {
    console.log('Files Received: ', name ,file)

    //Writing a File Asynchronously using nodejs
    //var fs =  require('fs');
    //var content= "this is the content in the file";
    //fs.writeFile('message.txt', content , (err) => {
    //  if (err)
    //    throw err;
    //  console.log('It\'s saved!');
    //});

    //Writing a File Synchronously using nodejs
    //var fs = require('fs');
    //var content = "We are writing this file synchronously using node.js";
    //fs.writeFileSync('content.txt', content);
    //console.log("File Written Successfully");
  })

  form.on('aborted', () => {
    console.error('Request aborted by the user')
    res.status(200).json({
      result: 'Upload Aborted'
    })
  })

  form.on('error', (err) => {
    console.error('Error', err)
    res.status(200).json({
      result: 'Upload Error'
    })
    //throw err
  })

  form.on('end', () => {
    res.status(200).json({
      result: 'Upload Success'
    });
    //res.end()
    //  res.json()
  })

  form.on('fileBegin', (name, file) => {
    const dirname = '.'
    file.path = __dirname + '/uploads/' + file.name
  })


  //res.sendFile(__dirname + '/index.html');
}