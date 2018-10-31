var fs = require('fs');

var path = './uploads'

module.exports = function download(req, res) {
  fs.readdir(path, function(err, items) {
    for (var i=0; i<items.length; i++) {
        var file = path + '/' + items[i];
        fs.stat(file, function(f) {
            return function(err, stats) {
              console.log(f, stats["size"]);
            }
        }(file));
    }

    res.status(200).json(items);
  });
}