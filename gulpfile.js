

const gulp = require("gulp"),
{ src, dest, series, parallel } = require("gulp");
sass = require("gulp-sass"),
postcss = require("gulp-postcss"),
autoprefixer = require("autoprefixer"),
cssnano = require("cssnano"),
sourcemaps = require("gulp-sourcemaps"),
webpack = require("webpack-stream"),
webpackConfig = require("./webpack.config.js");

var source = './app';
var output = './dist';
var assets = '/assets';

var sourcePaths = {
    html: source + '/*.html',
    sass: source + assets + '/css/**/*.scss',
    js: source + assets + '/js/App.js' 
}

var outputPaths = {
    html: output,
    css: output + assets + '/css',
    js: output + assets + '/js'
}

// CSS Task
gulp.task('cssTask', function () {
    return src(sourcePaths.sass)
    .pipe(sourcemaps.init()) // Initialize sourcemaps - Access CSS with devtools
    .pipe(sass().on("error", sass.logError)) // Log SASS errors
    .pipe(postcss([autoprefixer(), cssnano()])) // Vendor prefixes and CSS minification
    .pipe(sourcemaps.write(".")) // Create sourcemaps - Access CSS with devtools 
    .pipe(dest(outputPaths.css));
});

// JS Task
gulp.task('jsTask', function() {
    return src(sourcePaths.js)
    .pipe( webpack(webpackConfig, null, function (err, stats) {
        if (err) { console.log(err); }
    })) // .on('error', function (err) { if(err){ console.log(err.message);} })
    .pipe(dest(outputPaths.js));
});

// HTML Task
gulp.task('htmlTask', function() {
    return src(sourcePaths.html)
    .pipe(dest(outputPaths.html));
});

// Watch Task 
gulp.task('watch', function () {
    gulp.watch(sourcePaths.html, series('htmlTask'));
    gulp.watch(sourcePaths.sass, series('cssTask'));
    gulp.watch(sourcePaths.js, series('jsTask'));
});

