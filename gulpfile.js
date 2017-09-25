var path = require('path');
var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    data = require('gulp-data'),
    nunjucks = require('gulp-nunjucks'),
    iconfont = require('gulp-iconfont'),
    iconfontCss = require('gulp-iconfont-css'),
    fontName = 'aliro',
    reload = browserSync.reload;

var ghpages = require('gh-pages');

//es6 fix
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

var path = {
    build: {
        html: 'build/',
        data: 'build/data/',
        js: 'build/js/',
        css: 'build/',
        img: 'build/img/',
        media: 'build/media/',
        fonts: 'build/fonts/',
        iconfont: 'src/fonts/icons/'
    },
    src: {
        html: 'src/*.html',
        data: 'src/data/*.json',
        js: 'src/js/main.js',
        style: 'src/style/main.scss',
        img: 'src/img/**/*.*',
        media: 'src/media/**/*.*',
        fonts: 'src/fonts/**/*.*',
        iconfont: 'src/icons/*.svg'
    },
    watch: {
        html: 'src/**/*.html',
        data: 'src/data/**/*.json',
        js: 'src/js/**/*.js',
        style: 'src/style/**/*.scss',
        img: 'src/img/**/*.*',
        media: 'src/media/**/*.*',
        fonts: 'src/fonts/**/*.*',
        iconfont: 'src/icons/*.svg'
    },
    clean: './build'
};

var config = {
    server: {
        baseDir: "./build"
    },
    //tunnel: true,
    host: 'localhost',
    port: 5000,
    logPrefix: "Frontend_Devil"
};

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('html:build', function () {
    gulp.src(path.src.html)
        //.pipe(data(() => (globaldata)))
        .pipe(data(function() {
          return require('./src/data/global.json');
        }))
        .pipe(nunjucks.compile())
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
    gulp.src(path.src.js)
        return browserify(path.src.js)
        .transform(babelify, {
          presets: ['es2015']
        })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: ['src/style/'],
            outputStyle: 'compressed',
            sourceMap: true,
            errLogToConsole: true
        }))
        .pipe(prefixer())
        .pipe(cssmin())
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
    gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});

gulp.task('media:build', function() {
    gulp.src(path.src.media)
        .pipe(gulp.dest(path.build.media))
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('iconfont:build', function() {
    gulp.src(path.src.iconfont)
        .pipe(iconfontCss({
            path: './src/icons/_icons_template.scss',
            fontName: fontName,
            //prependUnicode: true, // recommended option
            //formats: ['svg', 'ttf', 'eot', 'woff', 'woff2'],
            //normalize: true,
            //fontHeight: 1001,
            targetPath: '../../style/helper/_icons.scss'
        }))
        .pipe(iconfont({
            fontName: fontName
        }))
        .pipe(gulp.dest(path.build.iconfont))
});

gulp.task('data:build', function() {
    gulp.src(path.src.data)
        .pipe(gulp.dest(path.build.data))
});

gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
    'image:build',
    'media:build',
    'fonts:build',
    'iconfont:build',
    'data:build'
]);

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.media], function(event, cb) {
        gulp.start('media:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
    watch([path.watch.iconfont], function(event, cb) {
        gulp.start('iconfont:build');
    });
    watch([path.watch.data], function(event, cb) {
        gulp.start('data:build');
    });
});

gulp.task('default', ['build', 'webserver', 'watch']);

gulp.task('deploy', function() {
    return gulp.src('./build/**/*')
    .pipe(ghPages());
});
