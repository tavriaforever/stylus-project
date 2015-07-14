var stylus = require('stylus');
var fs = require('fs');
var path = require('path');
var stylFile = fs.readFileSync('./desktop.bundles/index/index.styl', { encoding: 'utf-8' });
var filename = path.join(__dirname, 'desktop.bundles', 'index', 'index.css');
var renderer = stylus(stylFile);

renderer
    .set('filename', filename)
    .set('resolve url', true) // Без этой опции баг не воспроизводится
    .set('cache', false); // это опция ни на что не влияет

renderer.render(function (err, css) {
    if (err) throw err;
    console.log(css);
});
