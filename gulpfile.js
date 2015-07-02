'use strict';

var gulp = require('gulp'),
  wiredep = require('wiredep').stream,
  useref = require('gulp-useref'),
  uglify = require('gulp-uglify'),
  clean = require('gulp-clean'),
  gulpif = require('gulp-if'),
  filter = require('gulp-filter'),
  size = require('gulp-size'),
  imagemin = require('gulp-imagemin'),
	concatCss = require('gulp-concat-css'),
	minifyCss = require('gulp-minify-css'),
  rename = require('gulp-rename'),
  notify = require('gulp-notify'),
	autoprefixer = require('gulp-autoprefixer'),
	livereload = require('gulp-livereload'),
	connect = require('gulp-connect'),
  sass = require('gulp-sass'),
  jade = require('gulp-jade'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload;


/******************************************************/
/********************** РАБОТА В APP ******************/

// компилируем jade в html
gulp.task('jade', function() {
  gulp.src('app/templates/pages/*.jade')
    .pipe(jade({
      pretty: '\t'
    }))
    //.on('error', log)
    //.pipe(prettify({indent_size: 2}))
    .pipe(gulp.dest('app/'))
    .pipe(reload({stream: true}));
});

// компилируем sass в css
gulp.task('sass', function () {
  gulp.src('app/sass/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('app/css/'))
    .pipe(reload({stream: true}));
});

// Подключаем ссылки на bower components
gulp.task('wiredep', function() {
  gulp.src('app/templates/common/*.jade')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('app/templates/common/'));
});

// запускаем локальный сервер (только после компиляции jade)
gulp.task('server', ['jade', 'sass'], function() {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: 'app'
    }
  });
});

// слежка и запуск задач
gulp.task('watch', function() {
  gulp.watch('app/templates/**/*.jade', ['jade']);
  gulp.watch('app/sass/*.scss', ['sass']);
  gulp.watch('bower.json', ['wiredep']);
  gulp.watch([
    'app/js/*.js',
    'app/css/*.css'
  ]).on('change', reload)
});

// задача п-умолчанию
gulp.task('default', ['server', 'watch']);


/******************************************************/
/********************** СБОРКА ************************/

// очистка папки dist
gulp.task('clean', function() {
  return gulp.src('dist')
    .pipe(clean());
});

// переносим HTML, CSS, JS в папку dist
gulp.task('useref', ['sass'], function() {
  var assets = useref.assets();
  return gulp.src('app/*.html')
    .pipe(assets)
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', minifyCss({compatibility: 'ie8'})))
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(gulp.dest('dist'));
});

// перенос шрифтов
gulp.task('fonts', function() {
  gulp.src('app/fonts/*')
    .pipe(filter(['*.eot', '*.svg', '*.ttf', '*.woff', '*.woff2']))
    .pipe(gulp.dest('dist/fonts'));
});

// картинки
gulp.task('images', function() {
  gulp.src('app/img/*')
    .pipe(imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('dist/img'));
});

// остальные файлы
gulp.task('extras', function() {
  return gulp.src([
    'app/*.*',
    '!app/*.html'
  ]).pipe(gulp.dest('dist'));
});

// сборка и вывод размера содержимого папки dist
gulp.task('dist', ['useref', 'fonts', 'images', 'extras'], function() {
  return gulp.src('dist/**/*').pipe(size({title: 'build'}));
});

// собираем папку DIST (только после компиляции jade)
gulp.task('build', ['clean', 'jade'], function() {
  gulp.start('dist');
});